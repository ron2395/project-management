import DashBoard from '../components/DashBoard'
import Display from '../components/Display'
import { Col, Row, Container } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import UserTaskList from '../components/UserTaskList'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const HomeScreen = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if(!userInfo || userInfo === null){
      navigate('/login')
    }
  }, [userInfo, navigate])

  return (
    <Container >
      {userInfo ?
      <Row>
        <Col md={5} lg={4} xl={3}>
            <DashBoard />
        </Col>
        <Col md={7} lg={8} xl={9}>
          {location.pathname === '/usertasks' ?
            <UserTaskList /> : <Display />
          }
        </Col>
      </Row> : null}
    </Container>
  )
}

export default HomeScreen
