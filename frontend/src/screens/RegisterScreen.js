import { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';
import Message from '../components/Message';
import CustomCard from '../components/CustomCard';
import FormContainer from '../components/FormContainer';
import { USER_REGISTER_RESET } from '../constants/userConstants'

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userRegistration = useSelector((state) => state.userRegistration)
  const { loading, error, success } = userRegistration;

  useEffect(() => {
    if(success){
      dispatch({
        type: USER_REGISTER_RESET
      });
      navigate("/admin/userlist");
    }
  })

  const submitHandler = async(e) => {
    e.preventDefault();
    
    dispatch(register(firstName, lastName, email, password, role));
  };

  return (
    <FormContainer>
      <Col lg={4}>
        <CustomCard>
          <Row>
            <h1 className='mb-3 text-center'>New User</h1>
            {error ? (
              <Message variant='danger'>{error}</Message>
            ) : success ? (
              <Message variant='success'>User successfully registered</Message>
            ) : null}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='firstName' className='mb-2'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type='text'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter user's first name"
                />
              </Form.Group>
              <Form.Group controlId='lastName' className='mb-2'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type='text'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter user's last name"
                />
              </Form.Group>
              <Form.Group controlId='email' className='mb-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter user email'
                />
              </Form.Group>
              <Form.Group controlId='password' className='mb-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter a password'
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
              <Form.Group className='text-center'>
                <Button
                  type='submit'
                  variant='primary'
                  className='btn btn-primary w-100 mb-3'
                >
                  {loading ? <Spinner animation='border' /> : "Register"}
                </Button>
              </Form.Group>
            </Form>
          </Row>
        </CustomCard>
      </Col>
    </FormContainer>
  );
};

export default RegisterScreen;
