import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { PROJECT_UPDATE_RESET } from '../constants/projectContants'
import CustomCard from "../components/CustomCard";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { updateProjectDetail } from '../actions/projectActions'
import { getUserListByRole } from "../actions/userActions";
import { Multiselect } from "multiselect-react-dropdown";

//converting string date to js Date
const toDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return new Date(year, month - 1, Number(day) + 1)
}

const ProjectEditScreen = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [actualStart, setActualStart] = useState('')
  const [actualEnd, setActualEnd] = useState('')
  const [description, setDescription] = useState('');
  const [chosenDevelopers, setChosenDevelopers] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectDetail = useSelector((state) => state.projectDetail);
  const { loading, project } = projectDetail
  
  const userListByRole = useSelector((state) => state.userListByRole);
  const {
    users: developers
  } = userListByRole;

  const projectUpdate = useSelector((state) => state.projectUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = projectUpdate;

  const developerNames =
    project && project.developers
      ? project.developers.map((dev) => ({
          key: `${dev.firstName} ${dev.lastName} - ${dev.email}`,
          value: `${dev._id}`,
        }))
      : null;

  const developerList =
    developers && developers.length
      ? developers.map(
          (dev) =>({
            key:`${dev.firstName} ${dev.lastName} - ${dev.email}`,
            value: `${dev._id}`
        })
        )
      : ["No developers"];

  useEffect(() => {
    if (userInfo.role === "0" || userInfo.role === "1") {
    if (successUpdate) {
      dispatch({
        type: PROJECT_UPDATE_RESET,
      })
      navigate(`/project/${project._id}`);
    }else{
    dispatch(getUserListByRole("2"));
    setTitle(project.title);
    setDescription(project.description);
    if(project.actualStart){
      setActualStart(project.actualStart);
    }
    if (project.actualEnd) {
      setActualEnd(project.actualEnd);
    }
    if(project.developers){
      setChosenDevelopers(project.developers)
    }}
  }else{
    navigate("/login");
  }
  }, [dispatch, userInfo, id, navigate, project, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProjectDetail(
        title,
        toDate(actualStart),
        toDate(actualEnd),
        description,
        chosenDevelopers,
        id
      )
    );
  };

  return (
    <FormContainer>
      <Row className='justify-content-md-center'>
        <Col lg={6}>
          <Link to={`/project/${id}`} className='btn btn-light mb-3'>
            Go Back
          </Link>
          <CustomCard>
            <h2 className='mb-3'>Edit Project Details</h2>
            {errorUpdate ? (
              <Message variant='danger'>{errorUpdate}</Message>
            ) : null}
            {loading ? (
              <Loader />
            ) : errorUpdate ? (
              <Message variant='danger'>{errorUpdate}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='title' className='mb-2'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='actualStart' className='mb-2'>
                  <Form.Label>Actual start date</Form.Label>
                  <Form.Control
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
                <Form.Group controlId='password' className='mb-2'>
                  <Form.Label>description</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='New description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Multiselect
                  className='mb-3'
                  options={developerList}
                  selectedValues={developerNames}
                  displayValue='key'
                  isObject={true}
                  showCheckbox
                  closeOnSelect={false}
                  onSelect={(devs) =>
                    setChosenDevelopers(devs.map((dev) => dev.value))
                  }
                  onRemove={(devs) =>
                    setChosenDevelopers(devs.map((dev) => dev.value))
                  }
                />
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

export default ProjectEditScreen;
