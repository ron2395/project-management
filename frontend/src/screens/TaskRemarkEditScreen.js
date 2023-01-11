import { useEffect, useState } from "react";
import { Col, Row, Form, Button, Spinner, Card, Image } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import CustomCard from "../components/CustomCard";
import FormContainer from "../components/FormContainer";
import { PersonCircle } from "react-bootstrap-icons";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { TASK_REMARK_UPDATE_RESET } from "../constants/taskConstants";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskRemark, listTaskDetail } from "../actions/taskActions";
import { getUserProfile } from "../actions/userActions";

const TaskRemarkEditScreen = () => {
  const [remark, setRemark] = useState("");

  const { taskid, remarkid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { user } = userProfile;

  const taskDetail = useSelector(state => state.taskDetail)
  const { task } = taskDetail

  const taskRemarkUpdate = useSelector((state) => state.taskRemarkUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = taskRemarkUpdate;

  useEffect(() => {
    if (userInfo) {
      if (successUpdate) {
        dispatch({
          type: TASK_REMARK_UPDATE_RESET,
        });
        navigate(`/task/${taskid}`, { state: {projectid: task.projectId}});
      } else {
        dispatch(listTaskDetail(taskid))
        dispatch(getUserProfile());
        setRemark("");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, dispatch, successUpdate, userInfo, taskid, task.projectId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTaskRemark({
        comment: remark,
        remarkUserId: userInfo._id,
        taskId: taskid,
        remarkId: remarkid,
      })
    );
  };

  return (
    <FormContainer>
      <Row className='justify-content-md-center'>
        <Col lg={6}>
          <Link to={`/task/${taskid}`} state={ {projectid: task.projectId} } className='btn btn-light mb-3'>
            Go Back
          </Link>
          <CustomCard>
            <CustomCard className='mb-3'>
              <Row className='d-flex-inline'>
                <Col md={2} lg={2} sm={3} xs={5}>
                  {user && user.image ? (
                    <Image
                      thumbnail
                      roundedCircle
                      src={
                        process.env.NODE_ENV === "development"
                          ? `http://localhost:3800${user.image}`
                          : `http://project-manager-x-api.onrender.com${user.image}`
                      }
                      style={{ width: "4rem", height: "4rem" }}
                    />
                  ) : (
                    <PersonCircle className='me-1' />
                  )}
                </Col>
                <Col lg={5} md={5} sm={5} xs={7}>
                  <h6>
                    {user.firstName} {user.lastName}
                  </h6>
                  <p>
                    {user.role === "0"
                      ? "Admin"
                      : user.role === "1"
                      ? "Project Manager"
                      : user.role === "2"
                      ? "Developer"
                      : "No role"}
                  </p>
                </Col>
              </Row>
            </CustomCard>
            <Card.Title>
              <h2 className='mb-3'>Edit Remark</h2>
            </Card.Title>
            {loadingUpdate ? (
              <Loader />
            ) : errorUpdate ? (
              <Message variant='danger'>{errorUpdate}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='actualStart' className='mb-2'>
                  <Form.Label>Edit Remark</Form.Label>
                  <Form.Control
                    required
                    maxLength={100}
                    as='textarea'
                    placeholder='Enter your remark'
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type='submit'
                  variant='primary'
                  className='btn btn-primary w-100 mb-3'
                >
                  {loadingUpdate ? <Spinner animation='border' /> : "Update"}
                </Button>
              </Form>
            )}
          </CustomCard>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default TaskRemarkEditScreen;
