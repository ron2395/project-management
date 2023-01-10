import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom'
import { createProject } from '../actions/projectActions'
import { getUserListByRole } from '../actions/userActions'
import Message from "../components/Message";
import CustomCard from "../components/CustomCard";
import FormContainer from "../components/FormContainer";
import { PROJECT_CREATE_RESET } from "../constants/projectContants";

//converting string date to js Date
const toDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return new Date(year, month - 1, day)
};

const NewProjectScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [plannedStart, setPlannedStart] = useState("");
  const [plannedEnd, setPlannedEnd] = useState("");
  const [manager, setManager] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectCreate = useSelector((state) => state.projectCreate);
  const { loading, error, success, project } = projectCreate;

  const userListByRole = useSelector((state) => state.userListByRole);
  const { loading: loadingManagers, users: managers, error: errorManagers } = userListByRole

  useEffect(() => {
    dispatch({
      type: PROJECT_CREATE_RESET
    })
    dispatch(getUserListByRole('1'));
    if(userInfo.role !== '0'){
      navigate('/login')
    }
    if(success){
      navigate(`/project/${project._id}`)
    }
  }, [dispatch, navigate, project, userInfo, success])

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(createProject(title, toDate(plannedStart), toDate(plannedEnd), description, manager))
  };

  return (
    <FormContainer>
      <Col lg={6}>
        <Link to='/' className='btn btn-light mb-3'>
          Go Back
        </Link>
        <CustomCard>
          <Row>
            <h1 className='mb-3 text-center'>New Project</h1>
            {error ? (
              <Message variant='danger'>{error}</Message>
            ) : success ? (
              <Message variant='success'>Project successfully created</Message>
            ) : null}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='title' className='mb-2'>
                <Form.Label>Project title</Form.Label>
                <Form.Control
                  required
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Enter a title for this project'
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
                <Form.Label>Manager</Form.Label>
                <Form.Select
                  required
                  aria-label='Select Project manager'
                  value={manager}
                  onChange={(e) => setManager(e.target.value)}
                >
                  <option value=''>Select Project Manager</option>
                  {!loadingManagers && managers ? managers.map((manager, i) => (
                    <option key={i} value={manager._id}>
                      {manager.firstName} {manager.lastName} - {manager.email}
                    </option>
                  )) : null}
                </Form.Select>
              </Form.Group>
              <Form.Group className='text-center'>
                <Button
                  type='submit'
                  variant='primary'
                  className='btn btn-primary w-100 mb-3'
                >
                  {loading ? <Spinner animation='border' /> : "Create Project"}
                </Button>
              </Form.Group>
            </Form>
          </Row>
        </CustomCard>
      </Col>
    </FormContainer>
  );
};

export default NewProjectScreen;
