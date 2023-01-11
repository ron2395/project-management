import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { TASK_UPDATE_RESET } from "../constants/taskConstants";
import CustomCard from "../components/CustomCard";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { updateTaskDetail } from "../actions/taskActions";

//converting string date to js Date
const toDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return new Date(year, month - 1, Number(day) + 1);
};

const TaskEditScreen = () => {
  const { taskid } = useParams();

  const [actualStart, setActualStart] = useState("")
  const [actualEnd, setActualEnd] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const taskUpdate = useSelector(state => state.taskUpdate)
  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = taskUpdate

  const taskDetail = useSelector((state) => state.taskDetail);
  const { loading, task } = taskDetail;

  useEffect(() => {
    if (userInfo) {
      if (successUpdate) {
        dispatch({
          type: TASK_UPDATE_RESET,
        });
        navigate(`/task/${taskid}`, { state: {projectid: task.projectId} });
      } else {
        if (task.actualStart) {
          setActualStart(task.actualStart);
        }
        if (task.actualEnd) {
          setActualEnd(task.actualEnd);
        }
      }
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, task, taskid, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTaskDetail(
        toDate(actualStart),
        toDate(actualEnd),
        taskid
      )
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
            <h2 className='mb-3'>Update Task Timeline</h2>
            {errorUpdate ? (
              <Message variant='danger'>{errorUpdate}</Message>
            ) : null}
            {loading ? (
              <Loader />
            ) : errorUpdate ? (
              <Message variant='danger'>{errorUpdate}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='actualStart' className='mb-2'>
                  <Form.Label>Actual start date</Form.Label>
                  <Form.Control
                    required
                    type='date'
                    placeholder='Enter start date'
                    value={actualStart.substring(0, 10)}
                    onChange={(e) => setActualStart(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='actualEnd' className='mb-2'>
                  <Form.Label>Actual end</Form.Label>
                  <Form.Control
                    type='date'
                    placeholder='select end date'
                    value={actualEnd.substring(0, 10)}
                    onChange={(e) => setActualEnd(e.target.value)}
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

export default TaskEditScreen;
