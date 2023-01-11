import DashBoard from '../components/DashBoard'
import Display from '../components/Display'
import { Col, Row, Container } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import UserTaskList from '../components/UserTaskList'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import TimeGraph from '../components/TimeGraph'

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
        <Col lg={5} xl={4}>
            <DashBoard />
            <TimeGraph />
        </Col>
        <Col lg={7} xl={8}>
          {location.pathname === '/' ?
            <Display /> : <UserTaskList />
          }
        </Col>
      </Row> : null}
    </Container>
  )
}

export default HomeScreen
