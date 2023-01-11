import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import {
  Col,
  Row,
  Container,
  Card,
  Form,
  Button,
  ListGroup,
  Badge,
  Spinner,
} from "react-bootstrap";
import {
  createTaskRemark,
  deleteTaskRemark,
  destroyTask,
  listTaskDetail,
} from "../actions/taskActions";
import {
  listProjectDetail
} from '../actions/projectActions'
import CustomCard from "../components/CustomCard";
import Message from "../components/Message";
import Loader from '../components/Loader'
import {
  TASK_REMARK_DESTROY_RESET,
  TASK_REMARK_CREATE_RESET,
  TASK_DESTROY_RESET,
} from "../constants/taskConstants";

const dateDelay = (date1, date2) => {
  const d1 = new Date(date1.substring(0, 10));
  const d2 = new Date(date2.substring(0, 10));
  return (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
}

const TaskScreen = () => {
  const [taskRemark, setTaskRemark] = useState("")

  const { taskid } = useParams()

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { projectid } = location.state

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const taskDetail = useSelector(state => state.taskDetail)
  const {
    success: successTaskDetail,
    error: errorTaskDetail,
    loading: loadingTaskDetail,
    task
    } = taskDetail;

    const taskDestroy = useSelector(state => state.taskDestroy)
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = taskDestroy;

    const taskRemarkDestroy = useSelector(
      (state) => state.taskRemarkDestroy
    );
    const {
      loading: loadingDeleteRemark,
      success: successDeleteRemark,
      error: errorDeleteRemark,
    } = taskRemarkDestroy;

    const taskRemarkCreate = useSelector((state) => state.taskRemarkCreate);
    const {
      loading: loadingCreateRemark,
      error: errorCreateRemark,
      success: successCreateRemark,
    } = taskRemarkCreate;

  const projectDetail = useSelector((state) => state.projectDetail);
  const {
    loading: loadingProjectDetail,
    error: errorProjectDetail,
    success: successProjectDetail,
    project } = projectDetail;

    useEffect(() => {
      dispatch(listTaskDetail(taskid))
      dispatch(listProjectDetail(projectid));
      if (successCreateRemark) {
        setTaskRemark('');
        setTimeout(
          () =>
            dispatch({
              type: TASK_REMARK_CREATE_RESET,
            }),
          3000
        );
      }
      if (successDeleteRemark) {
        setTimeout(
          () =>
            dispatch({
              type: TASK_REMARK_DESTROY_RESET,
            }),
          3000
        );
      }
      if (successDelete) {
        dispatch({
          type: TASK_DESTROY_RESET,
        });
        navigate(`/project/${projectid}`);
      }
    }, [
      dispatch,
      successCreateRemark,
      taskid,
      successDeleteRemark,
      navigate,
      successDelete,
    ]);

  const remarkSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(createTaskRemark(task._id, taskRemark))
  }

  const deleteRemark = (projectid) => {
    if (window.confirm("Are you sure?")) {
        dispatch(deleteTaskRemark(task._id, projectid));
    }
  };

  const deleteTaskHandler = () => {
    if(window.confirm("Are you sure?! Task will be delete")){
        dispatch(destroyTask(task._id));
    }
  }

  const editRemarkPageHandler = (remarkid) => {
    navigate(`/task/${taskid}/remark/${remarkid}/edit`);
  }

  return (
    <Container>
      <Row>
        <Col>
          <Link to={`/project/${projectid}`} className='btn btn-light mb-3'>
            Go Back
          </Link>
        </Col>
      </Row>
      <Row>
        <Col lg={5} className='mb-4'>
          <CustomCard className='text-center'>
            {errorProjectDetail ? (
              <Message variant='danger'>{errorProjectDetail}</Message>
            ) : null}
            {!loadingProjectDetail && successProjectDetail ? (
              <Fragment>
                <Card.Header className='mb-3'>
                  <h3>Project: {project.title}</h3>
                </Card.Header>
                <Card.Body className='p-0'>
                  <Card.Text>
                    <span className='fw-bold'>Project Manager: </span>
                    {project.manager.firstName} {project.manager.lastName}
                  </Card.Text>
                  <Card.Text>
                    <span className='fw-bold'>Started on: </span>
                    {project.actualStart
                      ? project.actualStart.substring(0, 10)
                      : "Not started yet"}
                  </Card.Text>
                  {project.actualEnd ? (
                    <Card.Text>
                      <span className='fw-bold'>Ended on: </span>
                      {project.actualEnd.substring(0, 10)}
                    </Card.Text>
                  ) : null}
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
                    <span className='fw-bold'>Developers involved: </span>
                    {project.developers.length}
                  </Card.Text>
                </Card.Body>
              </Fragment>
            ) : (
              <Loader />
            )}
          </CustomCard>
        </Col>
        <Col lg={7} className='mb-4'>
          {errorDelete ? (
            <Message variant='danger'>{errorDelete}</Message>
          ) : null}
          <CustomCard>
            {errorTaskDetail ? (
              <Message variant='danger'>{errorTaskDetail}</Message>
            ) : null}
            {!loadingTaskDetail && successTaskDetail && !loadingDelete ? (
              <Fragment>
                <Card.Header className='d-flex justify-content-between'>
                  <h2 className='text-center'>
                    {task.title && task.title.toUpperCase()}
                  </h2>
                  <div>
                    <LinkContainer className='me-1' to={`/task/${taskid}/edit`}>
                      <Button variant='secondary'>
                        <PencilSquare />
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' onClick={deleteTaskHandler}>
                      <Trash />
                    </Button>
                  </div>
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
                    {project && project.manager ? (
                      <Fragment>
                        <span className='fw-bold'>Responsible person:</span>{" "}
                        {`${task.responsible.firstName} ${task.responsible.lastName}`}
                      </Fragment>
                    ) : (
                      "No developer assigned yet"
                    )}
                  </Card.Text>
                  <Card.Text>
                    <span className='fw-bold'>Status: </span>
                    {task.actualStart && task.actualEnd
                      ? "Completed"
                      : task.actualStart && !task.actualEnd
                      ? "In-Progress"
                      : !task.actualStart && !task.actualEnd
                      ? "Not started"
                      : !task.actualStart && task.actualEnd
                      ? "Completed"
                      : "No status"}
                  </Card.Text>
                  <Card.Text>
                    <span className='fw-bold'>Planned Start:</span>{" "}
                    {task.plannedStart && task.plannedStart.substring(0, 10)}
                  </Card.Text>
                  <Card.Text>
                    <span className='fw-bold'>Actual Start:</span>{" "}
                    {task.actualStart
                      ? task.actualStart.substring(0, 10)
                      : "Not started yet"}
                  </Card.Text>
                  <Card.Text>
                    <span className='fw-bold'>Planned End:</span>{" "}
                    {task.plannedEnd && task.plannedEnd.substring(0, 10)}
                  </Card.Text>
                  {task.actualEnd ? (
                    <Card.Text>
                      <span className='fw-bold'>Actual End:</span>{" "}
                      {task.actualEnd.substring(0, 10)}
                    </Card.Text>
                  ) : null}
                  {task.plannedEnd && task.actualEnd ? (
                    <Card.Text>
                      <span className='fw-bold'>Start Delay:</span>{" "}
                      {dateDelay(task.plannedStart, task.actualStart)} days
                    </Card.Text>
                  ) : null}
                  {task.plannedEnd && task.actualEnd ? (
                    <Card.Text>
                      <span className='fw-bold'>End Delay:</span>{" "}
                      {dateDelay(task.plannedEnd, task.actualEnd)} days
                    </Card.Text>
                  ) : null}
                  <Card.Text>
                    <span className='fw-bold'>Description:</span>{" "}
                    {task.description}
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
                        as='textarea'
                        value={taskRemark}
                        onChange={(e) => setTaskRemark(e.target.value)}
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
                    Task Remarks
                  </Card.Text>
                  {errorDeleteRemark ? (
                    <Message variant='danger'>{errorDeleteRemark}</Message>
                  ) : null}
                  {successDeleteRemark ? (
                    <Message variant='danger'>Remark Deleted</Message>
                  ) : null}
                  {!loadingDeleteRemark ? (
                    <ListGroup className='mt-3'>
                      {task.remarks && task.remarks.length ? (
                        task.remarks.map((remark) => (
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
              </Fragment>
            ) : (
              <Loader />
            )}
          </CustomCard>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskScreen;
