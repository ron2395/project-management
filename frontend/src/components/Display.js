import { useEffect } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomCard from "./CustomCard";
import Project from "./Project";
import Loader from "./Loader";
import Message from "./Message";
import { listProjects } from "../actions/projectActions";
import { LinkContainer } from "react-router-bootstrap";

const Display = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const projectList = useSelector(state => state.projectList)
    const { projects, loading, error } = projectList

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(userInfo){
            dispatch(listProjects())
        }else{
            navigate('/login')
        }
        }, [userInfo, dispatch, navigate])

  return (
    <CustomCard className=''>
      <Card.Title className='d-flex'>
        <h2 className='mb-3'>PROJECTS</h2>
        {userInfo.role === '0' ?
        <LinkContainer to='/project/new'>
          <Button
          variant='primary'
          className='ms-auto my-auto'
          >New Project</Button>
        </LinkContainer>
        : null}
      </Card.Title>
      <ListGroup>
        {error ? <Message variant='danger'>{error}</Message> : null}
        {loading ? (
          <Loader />
        ) : projects && projects.length ? (
          projects.map((project, i) => <Project key={i} project={project} />)
        ) : (
          <h2>No projects</h2>
        )}
      </ListGroup>
    </CustomCard>
  );
}

export default Display
