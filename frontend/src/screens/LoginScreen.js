import { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import CustomCard from '../components/CustomCard'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
      if(userInfo){
        navigate('/')
      }
    }, [navigate, userInfo])

    const submitHandler = async(e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

  return (
    <FormContainer>
      <Col lg={4}>
        <CustomCard>
          <Row>
            <h1 className='mb-3 text-center'>User login</h1>
            {error ? <Message variant='danger'>Invalid credentials</Message> : null}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='email' className='mb-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='enter registered email'
                />
              </Form.Group>
              <Form.Group controlId='password' className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='enter your password'
                />
              </Form.Group>
              <Form.Group className='text-center'>
                <Button
                  type='submit'
                  variant='primary'
                  className='btn btn-primary w-100 mb-3'
                >
                  {loading ? <Spinner animation='border' /> : 'Login'}
                </Button>
              </Form.Group>
            </Form>
            <p className='text-center mt-3'>
              Please Contact admin for account registration
            </p>
          </Row>
        </CustomCard>
      </Col>
    </FormContainer>
  );
}

export default LoginScreen
