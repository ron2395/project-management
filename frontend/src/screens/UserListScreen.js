import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Row, Container, Col, Table, Button, Spinner, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { PencilSquare, PersonX } from "react-bootstrap-icons";
import CustomCard from "../components/CustomCard";
import { getUserList, destroyUser } from "../actions/userActions";
import Message from '../components/Message'

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDestroy = useSelector((state) => state.userDestroy);
  const { success: successDestroy } = userDestroy;

  useEffect(() => {
    if (userInfo && userInfo.role === "0") {
      dispatch(getUserList());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDestroy]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(destroyUser(id));
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col lg={10}>
          <Link to='/' className='btn btn-light mb-3'>
            Go Back
          </Link>
          <CustomCard>
            <Card.Title className="d-flex">
            {error ? <Message variant='danger'>{error}</Message> : null}
            <h1 className="d-inline-flex">Users</h1>
            <Link to={`/register`} className='d-inline-flex btn btn-light mb-3 ms-auto'>
              Add User
            </Link>
            </Card.Title>
            {loading ? <Spinner /> : null}
            <Table striped responsive hover bordered className='table-md'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
                <tbody>
                  {! loading && users && users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>
                        {user.role === "0"
                          ? "Admin"
                          : user.role === "1"
                          ? "Project Manager"
                          : user.role === "2"
                          ? "Developer"
                          : "No role!"}
                      </td>
                      <td>
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                          <Button variant='secondary' className='btn-sm'>
                            <PencilSquare />
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm ms-3'
                          onClick={() => deleteHandler(user._id)}
                        >
                          <PersonX />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </Table>
          </CustomCard>
        </Col>
      </Row>
    </Container>
  );
};

export default UserListScreen;
