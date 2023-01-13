import { useEffect, useState, useRef } from 'react'
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import CustomCard from '../components/CustomCard'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'
import autoAnimate from '@formkit/auto-animate'
import API from '../api'

const LoginScreen = () => {
    const [request, setRequest] = useState(false)
    const [requestEmail, setRequestEmail] = useState('')
    const [requestReceived, setRequestReceived] = useState(false)
    const [errorRequest, setErrorRequest] = useState('')
    const [requestRole, setRequestRole] = useState('Any')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const parent = useRef(null);

    let duplicateRequest = 409
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
      parent.current && autoAnimate(parent.current);
      if(userInfo){
        navigate('/')
      }
    }, [navigate, userInfo, parent])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email.toLowerCase(), password))
    }

    const requestSubmitHandler = async(e) => {
      e.preventDefault()
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      await API.post('/users/request', { email: requestEmail, role: requestRole }, config)
      .then((response) => {
        console.log(response)
      setRequestEmail('')
      setRequestReceived(true)
      setRequestRole('Any')
      setRequest(false)})
      .catch((err) => err.response.status === duplicateRequest
      ? setErrorRequest('Request already registered')
      : setErrorRequest('Error registering request')
      )
    }

  return (
    <FormContainer>
      <Col lg={4}>
        <CustomCard>
          <Row>
            <h1 className='mb-3 text-center'>User login</h1>
            {error ? (
              <Message variant='danger'>Invalid credentials</Message>
            ) : null}
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
                  {loading ? <Spinner animation='border' /> : "Login"}
                </Button>
              </Form.Group>
            </Form>
            <p className='text-center mt-3'>
              Please Contact admin for account registration
            </p>
            {requestReceived ? (
              <Message variant='success'>
                Request for account registered
              </Message>
            ) : errorRequest ? (
              <Message variant='danger'>{errorRequest}</Message>
            ) : null}
          </Row>
          <Row>
            <div ref={parent}>
            <Col className='text-center'>
              <Button
                className='mb-3'
                variant='secondary'
                onClick={() => setRequest(!request)}
              >
                {request ? "Close" : "Request for account"}
              </Button>
            </Col>
            {request ? (
              <Form onSubmit={requestSubmitHandler}>
                <h4>Request for credentials</h4>
                <Form.Group controlId='request-email' className='mb-2'>
                  <Form.Label>Email for receiving credentials</Form.Label>
                  <Form.Control
                    type='email'
                    required
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    placeholder='enter your email'
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Role you want to try</Form.Label>
                  <Form.Select
                    type='role'
                    value={requestRole}
                    onChange={(e) => setRequestRole(e.target.value)}
                    placeholder='select role you want'
                  >
                    <option value='Any'>Any</option>
                    <option value='Manager'>Project Manager</option>
                    <option value='Dev'>Developer</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className='text-center'>
                  <Button
                    type='submit'
                    variant='primary'
                    className='btn btn-primary ms-1'
                  >
                    {loading ? <Spinner animation='border' /> : "Request"}
                  </Button>
                </Form.Group>
              </Form>
            ) : null}
            </div>
          </Row>
        </CustomCard>
      </Col>
    </FormContainer>
  );
}

export default LoginScreen
