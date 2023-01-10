import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Col, Row, Form, Button, Spinner } from 'react-bootstrap'
import { useNavigate, useParams, Link } from "react-router-dom"
import { updateUserDetail, getUserDetails } from "../actions/userActions"
import { USER_UPDATE_RESET } from "../constants/userConstants"
import CustomCard from "../components/CustomCard"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import Loader from "../components/Loader"

const UserEditScreen = () => {
    const { id } = useParams()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = userUpdate;

    useEffect(() => {
        if(successUpdate){
            dispatch({
                type: USER_UPDATE_RESET
            })
            navigate('/admin/userlist');
        }else{
            if (user._id !== id) {
              dispatch(getUserDetails(id));
            } else {
              setFirstName(user.firstName);
              setLastName(user.lastName);
              setEmail(user.email);
              setRole(user.role);
            }
        }
    }, [dispatch, successUpdate, user, id, navigate])


    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(
        updateUserDetail({firstName, lastName, email, role, password, id})
      );
    }

  return (
    <FormContainer>
      <Row className='justify-content-md-center'>
        <Col lg={6}>
          <Link to='/admin/userlist' className='btn btn-light mb-3'>
            Go Back
          </Link>
          <CustomCard>
            <h2 className='mb-3'>Edit User Details</h2>
            {loadingUpdate ? <Loader /> : null}
            {errorUpdate ? (
              <Message variant='danger'>{errorUpdate}</Message>
            ) : null}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='firstName' className='mb-2'>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter first name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='lastName' className='mb-2'>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='email' className='mb-2'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='password' className='mb-2'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter new password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='role' className='mb-4'>
                  <Form.Label>User role:</Form.Label>
                  <Form.Select
                    required
                    aria-label='Select user role'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value=''>Select user role</option>
                    <option value='0'>Admin</option>
                    <option value='1'>Project Manager</option>
                    <option value='2'>Developer</option>
                  </Form.Select>
                </Form.Group>
                <Button
                  type='submit'
                  variant='primary'
                  className='btn btn-primary w-100 mb-3'
                >
                  {loading ? <Spinner animation='border' /> : "Update"}
                </Button>
              </Form>
            )}
          </CustomCard>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default UserEditScreen
