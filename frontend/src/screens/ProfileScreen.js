import {
  Col,
  Image,
  Row,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import CustomCard from "../components/CustomCard";
import { getUserProfile, updateUserProfile } from "../actions/userActions";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import autoAnimate from "@formkit/auto-animate";
import API from "../api";

const ProfileScreen = () => {
  const [editUserDetails, setEditUserDetails] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const parent = useRef(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, success, error, user } = userProfile;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userProfileUpdate;

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(getUserProfile());
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      if(user.image){
        setImage(user.image);
      }
    }
  }, [
    navigate,
    dispatch,
    userInfo,
    success,
    user.email,
    user.firstName,
    user.lastName,
    user.image,
    parent
  ]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await API.post("/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error.response.data);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        firstName,
        lastName,
        email,
        image,
      })
    );
  };

  return (
    <FormContainer>
      <Col lg={5}>
        <Link to={`/`} className='btn btn-light mb-3'>Home</Link>
        {errorUpdate ? <Message variant='danger'>{errorUpdate}</Message> : null}
        {successUpdate ? (
          <Message variant='success'>Profile info updated</Message>
        ) : null}
        {error ? <Message variant='danger'>{error}</Message> : null}
        <CustomCard className='text-center'>
          {!loading && success ? (
            <Row className="justify-content-center">
              {user && user.image ? (
                <Image
                  style={{ height: "12rem", width: "12rem" }}
                  className='rounded-circle'
                  src={user.image}
                />
              ) : (
                <Card.Title>
                  <PersonCircle style={{ fontSize: "7rem" }} className='mb-3' />
                </Card.Title>
              )}
              <Card.Body className='mt-3'>
                <Card.Text as='h3'>
                  {user.firstName} {user.lastName}
                </Card.Text>
                <Card.Text>
                  {user.role === "0"
                    ? "Admin"
                    : user.role === "1"
                    ? "Project Manager"
                    : user.role === "2"
                    ? "Developer"
                    : "Contact Admin for role"}
                </Card.Text>
                <Card.Text>Email: {user.email}</Card.Text>
              </Card.Body>
            </Row>
          ) : (
            <Loader />
          )}
          <Row>
            <div ref={parent}>
              <Col>
                <Button
                  className='btn btn-primary btn-sm'
                  onClick={() => setEditUserDetails(!editUserDetails)}
                >
                  {editUserDetails ? "Done" : "Edit Profile"}
                </Button>
              </Col>
              {editUserDetails ? (
                <Form className='mt-4' onSubmit={submitHandler}>
                  <h3>Update details</h3>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter first name'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter last name'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId='image' className='mb-2'>
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control
                      type='text'
                      className='mb-3 d-none'
                      placeholder='Image url'
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <Form.Control
                      type='file'
                      label='Choose file'
                      onChange={uploadFileHandler}
                    />
                    {uploading ? <Loader /> : null}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter email address'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    type='submit'
                    variant='primary'
                    className='btn btn-success mt-3 ms-1'
                  >
                    {loadingUpdate ? <Spinner animation='border' /> : "Update"}
                  </Button>
                </Form>
              ) : null}
            </div>
          </Row>
        </CustomCard>
      </Col>
    </FormContainer>
  );
};

export default ProfileScreen;
