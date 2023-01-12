import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  listProjectDetail,
  deleteProjectRemark,
  createProjectRemark,
  destroyProject
} from "../actions/projectActions";
import { listTasks } from '../actions/taskActions';
import { Trash, PlusCircleFill, PersonCircle, PencilSquare } from 'react-bootstrap-icons'
import {Col, Image, Row, Container, Card, Form, Button, ListGroup, Badge, Spinner} from 'react-bootstrap'
import CustomCard from '../components/CustomCard'
import Task from '../components/Task'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  PROJECT_REMARK_CREATE_RESET,
  PROJECT_REMARK_DESTROY_RESET,
  PROJECT_DESTROY_RESET,
} from "../constants/projectContants";

const dateDelay = (date1, date2) => {
  const d1 = new Date(date1.substring(0,10))
  const d2 = new Date(date2.substring(0, 10))
  return (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
}

const ProjectScreen = () => {
  const [projectRemark, setProjectRemark] = useState('')
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const projectDetail = useSelector((state) => state.projectDetail);
  const { loading, error, success: successDetail, project } = projectDetail;

  const taskList = useSelector(state => state.taskList)
  const {
    tasks,
    error: taskListError,
    success: taskListSuccess,
    loading: taskListLoading
  } = taskList

  const projectRemarkDestroy = useSelector(state => state.projectRemarkDestroy)
  const {
    loading: loadingDeleteRemark,
    success: successDeleteRemark,
    error: errorDeleteRemark
  } = projectRemarkDestroy;

  const projectRemarkCreate = useSelector((state) => state.projectRemarkCreate)
  const {
    loading: loadingCreateRemark,
    error: errorCreateRemark,
    success: successCreateRemark
  } = projectRemarkCreate;

  const projectDestroy = useSelector(state => state.projectDestroy)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = projectDestroy

  useEffect(() => {
    dispatch(listProjectDetail(id))
    dispatch(listTasks(id))
    if(successCreateRemark){
      setProjectRemark('')
      setTimeout(
        () =>
          dispatch({
            type: PROJECT_REMARK_CREATE_RESET
          }),
        3000
      );
    }
    if (successDeleteRemark) {
      setTimeout(
        () =>
          dispatch({
            type: PROJECT_REMARK_DESTROY_RESET
          }),
        3000
      );
    }
    if(successDelete){
      dispatch({
        type: PROJECT_DESTROY_RESET,
      });
      navigate('/')
    }
  }, [dispatch,
    successCreateRemark,
    id,
    successDeleteRemark,
    navigate,
    successDelete]);

  const remarkSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(createProjectRemark(project._id, projectRemark))
  }

  const deleteRemark = (id) => {
    if(window.confirm("Are you sure?")){
    dispatch(deleteProjectRemark(project._id, id))
  }}

  const deleteProjectHandler = () => {
    if(window.confirm("Are you sure?! This will delete the project. Can't be undone")){
      dispatch(destroyProject(project._id))
    }
  }

  const editRemarkPageHandler = (remarkId) => {
    navigate(`/project/${id}/remark/${remarkId}/edit`)
  }

  return (
    <Container>
      <Row>
        <Col>
          <Link to='/' className='btn btn-light mb-3'>
            Go Back
          </Link>
        </Col>
        {errorDelete ? <Message variant='danger'>{errorDelete}</Message> : null}
      </Row>
      <Row className='justify-content-md-center'>
        {error ? <Message variant='danger'>{error}</Message> : null}
        {!loading && successDetail && !loadingDelete ? (
          <Fragment>
            <Col lg={3} className='mb-4'>
              <CustomCard>
                <Card.Header className='mb-3'>
                  <h4 className='text-center'>Developers</h4>
                </Card.Header>
                <Card.Body className='p-0'>
                  <ListGroup>
                    {project.developers && project.developers.length ? (
                      project.developers.map((dev) => (
                        <ListGroup.Item key={dev._id}>
                          <Row>
                            <Col md={1} xs={2} sm={1} lg={3} xl={2} className='me-3'>
                              {dev.image ? (
                                <Image
                                  roundedCircle
                                  style={{ width: "2.7rem", height: "2.7rem" }}
                                  src={dev.image}
                                />
                              ) : (
                                <PersonCircle
                                  style={{ width: "2.7rem", height: "2.7rem" }}
                                />
                              )}
                            </Col>
                            <Col md={6} xs={7} sm={7} lg={7} xl={7}>
                              <h6>
                                {dev.firstName} {dev.lastName}
                              </h6>
                              <span>Developer</span>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <Card.Text>No developers involved</Card.Text>
                    )}
                  </ListGroup>
                </Card.Body>
              </CustomCard>
            </Col>
            <Col lg={5} className='mb-4'>
              <CustomCard>
                <Card.Header className='d-flex justify-content-between'>
                  <h2 className='text-center'>
                    {project.title && project.title.toUpperCase()}
                  </h2>
                  {userInfo.role === "0" || userInfo.role === "1" ? (
                    <div>
                      <LinkContainer
                        className='me-1'
                        to={`/project/${project._id}/edit`}
                      >
                        <Button variant='secondary'>
                          <PencilSquare />
                        </Button>
                      </LinkContainer>
                      <Button variant='danger' onClick={deleteProjectHandler}>
                        <Trash />
                      </Button>
                    </div>
                  ) : null}
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {project.manager ? (
                      <Fragment>
                        <span className='fw-bold'>Project manager:</span>{" "}
                        {`${project.manager.firstName} ${project.manager.lastName}`}
                      </Fragment>
                    ) : (
                      "No manager assigned yet"
                    )}
                  </Card.Text>
                  <Card.Text>
                    <span className='fw-bold'>Status: </span>
                    {project.actualStart && project.actualEnd
                      ? "Completed"
                      : project.actualStart && !project.actualEnd
                      ? "In-Progress"
                      : !project.actualStart && !project.actualEnd
                      ? "Not started"
                      : !project.actualStart && project.actualEnd
                      ? "Completed"
                      : "No status"}
                  </Card.Text>
                  <Card.Text>
                    <span className='fw-bold'>Planned Start:</span>{" "}
                    {project.plannedStart &&
                      project.plannedStart.substring(0, 10)}
                  </Card.Text>
                  <Card.Text>
                    <span className='fw-bold'>Actual Start:</span>{" "}
                    {project.actualStart
                      ? project.actualStart.substring(0, 10)
                      : "Not started yet"}
                  </Card.Text>
                  <Card.Text>
                    <span className='fw-bold'>Planned End:</span>{" "}
                    {project.plannedEnd && project.plannedEnd.substring(0, 10)}
                  </Card.Text>
                  {project.actualEnd ? (
                    <Card.Text>
                      <span className='fw-bold'>Actual End:</span>{" "}
                      {project.actualEnd.substring(0, 10)}
                    </Card.Text>
                  ) : null}
                  {project.plannedEnd && project.actualEnd ? (
                    <Card.Text>
                      <span className='fw-bold'>Start Delay:</span>{" "}
                      {dateDelay(project.plannedStart, project.actualStart)}{" "}
                      days
                    </Card.Text>
                  ) : null}
                  {project.plannedEnd && project.actualEnd ? (
                    <Card.Text>
                      <span className='fw-bold'>End Delay:</span>{" "}
                      {dateDelay(project.plannedEnd, project.actualEnd)} days
                    </Card.Text>
                  ) : null}
                  <Card.Text>
                    <span className='fw-bold'>Description:</span>{" "}
                    {project.description}
                  </Card.Text>
                  <hr />
                  {successCreateRemark ? (
                    <Message variant='success'>Remark created</Message>
                  ) : null}
                  {errorCreateRemark ? (
                    <Message variant='danger'>{errorCreateRemark}</Message>
                  ) : null}
                  <Form onSubmit={remarkSubmitHandler}>
                    <Form.Group controlId='projectRemark'>
                      <Form.Label>Leave a remark:</Form.Label>
                      <Form.Control
                        rows={2}
                        maxLength={100}
                        as='textarea'
                        value={projectRemark}
                        onChange={(e) => setProjectRemark(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      {loadingCreateRemark ? (
                        <Spinner animation='border' />
                      ) : (
                        <Button type='submit' className='btn btn-primary mt-2'>
                          Submit
                        </Button>
                      )}
                    </Form.Group>
                  </Form>
                  <hr />
                  <Card.Text className='text-center fw-bold' as='h4'>
                    Project Remarks
                  </Card.Text>
                  {errorDeleteRemark ? (
                    <Message variant='danger'>{errorDeleteRemark}</Message>
                  ) : null}
                  {successDeleteRemark ? (
                    <Message variant='danger'>Remark Deleted</Message>
                  ) : null}
                  {!loadingDeleteRemark ? (
                    <ListGroup className='mt-3'>
                      {project.remarks && project.remarks.length ? (
                        project.remarks.map((remark) => (
                          <ListGroup.Item key={remark._id}>
                            <div className='ms-2 me-auto'>
                              <div className='fw-bold d-flex justify-content-between'>
                                {remark.user.firstName} {remark.user.lastName}
                                {userInfo &&
                                userInfo._id.toString() ===
                                  remark.user._id.toString() ? (
                                  <div>
                                    <PencilSquare
                                      style={{
                                        cursor: "pointer",
                                        fontSize: "1.3rem",
                                      }}
                                      className='me-3'
                                      onClick={() =>
                                        editRemarkPageHandler(remark._id)
                                      }
                                    />
                                    <Trash
                                      style={{
                                        cursor: "pointer",
                                        fontSize: "1.3rem",
                                      }}
                                      onClick={() => deleteRemark(remark._id)}
                                    />
                                  </div>
                                ) : null}
                              </div>
                              <Badge className='ms-auto' bg='primary' pill>
                                {remark.user.role === "0"
                                  ? "Admin"
                                  : remark.user.role === "1"
                                  ? "Project manager"
                                  : null}
                              </Badge>
                            </div>
                            <div className='ms-2 mt-2 me-auto'>
                              {remark.comment}
                            </div>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <Fragment>
                          <hr />
                          No remarks yet
                        </Fragment>
                      )}
                    </ListGroup>
                  ) : (
                    <Spinner animation='border' />
                  )}
                </Card.Body>
              </CustomCard>
            </Col>
            <Col lg={4}>
              <CustomCard>
                <Card.Header className='mb-3 d-flex justify-content-between'>
                  <h4 className='text-center d-inline-flex'>Tasks</h4>
                  {userInfo.role === "0" || userInfo.role === "1" ? (
                    <LinkContainer to={`/project/${project._id}/task/new`}>
                      <Button variant='success' className='pt-2 d-inline-flex'>
                        <PlusCircleFill />
                      </Button>
                    </LinkContainer>
                  ) : null}
                </Card.Header>
                <Card.Body className='p-0'>
                  {taskListLoading ? (
                    <Spinner animation='border' />
                  ) : taskListSuccess ? (
                    <ListGroup>
                      {tasks && tasks.length
                        ? tasks.map((task, i) => (
                            <Task projectid={id} key={i} task={task} />
                          ))
                        : "No tasks added"}
                    </ListGroup>
                  ) : taskListError ? (
                    <Message variant='danger'>{taskListError}</Message>
                  ) : null}
                </Card.Body>
              </CustomCard>
            </Col>
          </Fragment>
        ) : (
          <Loader />
        )}
      </Row>
    </Container>
  );
}

export default ProjectScreen