import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { createTask } from "../actions/taskActions";
import { listProjectDetail } from "../actions/projectActions";
import { getUserListByRole } from "../actions/userActions";
import Message from "../components/Message";
import CustomCard from "../components/CustomCard";
import FormContainer from "../components/FormContainer";
import { TASK_CREATE_RESET } from "../constants/taskConstants";

//converting string date to js Date
const toDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return new Date(year, month - 1, day);
};

const NewTaskScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [plannedStart, setPlannedStart] = useState("");
  const [plannedEnd, setPlannedEnd] = useState("");
  const [responsible, setResponsible] = useState('');

  const { id: projectId } = useParams()

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectDetail = useSelector((state) => state.projectDetail);
  const { project } = projectDetail;

  const taskCreate = useSelector((state) => state.taskCreate);
  const { loading, error, success } = taskCreate;

  const userListByRole = useSelector((state) => state.userListByRole);
  const {
    loading: loadingDevelopers,
    users: developers,
  } = userListByRole;

  useEffect(() => {
    if(userInfo.role === '0' || userInfo.role === '1'){
    dispatch(listProjectDetail(projectId))
    dispatch({
      type: TASK_CREATE_RESET,
    });
    dispatch(getUserListByRole("2"));
    if (success) {
      navigate(`/project/${projectId}`);
    }
}else{
    navigate("/login");
}
  }, [dispatch, navigate, userInfo, success, projectId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      createTask(
        title,
        toDate(plannedStart),
        toDate(plannedEnd),
        description,
        project.manager._id,
        responsible,
        projectId
      )
    );
  };

  return (
    <FormContainer>
      <Col lg={6}>
        <Link to={`/project/${projectId}`} className='btn btn-light mb-3'>
          Go Back
        </Link>
        <CustomCard>
          <Row>
            <h1 className='mb-3 text-center'>New Task</h1>
            <h4>Project: {project.title}</h4>
            {error ? (
              <Message variant='danger'>{error}</Message>
            ) : success ? (
              <Message variant='success'>Task successfully created</Message>
            ) : null}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='title' className='mb-2'>
                <Form.Label>Task title</Form.Label>
                <Form.Control
                  required
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Enter a title for this task'
                />
              </Form.Group>
              <Form.Group controlId='plannedStart' className='mb-2'>
                <Form.Label>Planned start date</Form.Label>
                <Form.Control
                  type='date'
                  value={plannedStart}
                  placeholder='choose start date'
                  onChange={(e) => setPlannedStart(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='plannedEnd' className='mb-2'>
                <Form.Label>Planned end date</Form.Label>
                <Form.Control
                  type='date'
                  value={plannedEnd}
                  placeholder='choose end date'
                  onChange={(e) => setPlannedEnd(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='description' className='mb-2'>
                <Form.Label>Description(300 words)</Form.Label>
                <Form.Control
                  required
                  maxLength={300}
                  as='textarea'
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Describe this project'
                />
              </Form.Group>
              <Form.Group controlId='role' className='mb-4'>
                <Form.Label>Responsible developer</Form.Label>
                <Form.Select
                  required
                  aria-label='Select responsible developer'
                  value={responsible}
                  onChange={(e) => setResponsible(e.target.value)}
                >
                  <option value=''>Select Developer</option>
                  {!loadingDevelopers && developers
                    ? developers.map((dev, i) => (
                        <option key={i} value={dev._id}>
                          {dev.firstName} {dev.lastName} -{" "}
                          {dev.email}
                        </option>
                      ))
                    : null}
                </Form.Select>
              </Form.Group>
              <Form.Group className='text-center'>
                <Button
                  type='submit'
                  variant='primary'
                  className='btn btn-primary w-100 mb-3'
                >
                  {loading ? <Spinner animation='border' /> : "Create Task"}
                </Button>
              </Form.Group>
            </Form>
          </Row>
        </CustomCard>
      </Col>
    </FormContainer>
  );
};

export default NewTaskScreen;