import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Row,
  Container,
  Col,
  Table,
  Button,
  Card,
} from "react-bootstrap";
import { PersonX } from "react-bootstrap-icons";
import CustomCard from "../components/CustomCard";
import API from "../api";

const RequestListScreen = () => {
    const [requests, setRequests] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

 const getRequestList = useCallback(async() => {
     const config = {
       headers: {
         Authorization: `Bearer ${userInfo.token}`,
       },
     };
     const { data } = await API.get("/users/request", config);
     if (data) {
       setRequests(data);
     }
 }, [userInfo.token]);

  useEffect(() => {
    if (userInfo && userInfo.role === "0") {
        getRequestList()
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, getRequestList]);

  const deleteHandler = async(id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await API.delete(`/users/request/${id}`, config)
    getRequestList()
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col lg={10}>
          <Link to='/' className='btn btn-light mb-3'>
            Go Back
          </Link>
          <CustomCard>
            <Card.Title className='d-flex'>
              <h1 className='d-inline-flex'>Account requests</h1>
              <Link
                to={`/register`}
                className='d-inline-flex btn btn-light mb-3 ms-auto'
              >
                Add User
              </Link>
            </Card.Title>
            <Table striped responsive hover bordered className='table-md'>
              <thead>
                <tr>
                  <th>Sr.no.</th>
                  <th>Email</th>
                  <th>Role requested</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length ? (
                  requests.map((request, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <a href={`mailto:${request.email}`}>{request.email}</a>
                      </td>
                      <td>
                        {request.role === "Manager"
                          ? "Project Manager"
                          : request.role === "Dev"
                          ? "Developer"
                          : "Any"}
                      </td>
                      <td>{request.createdAt.substring(0, 10)}</td>
                      <td>
                        <Button
                          variant='danger'
                          className='btn-sm ms-3'
                          onClick={() => deleteHandler(request._id)}
                        >
                          <PersonX />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No new requests</td>
                    <td>-</td>
                    <td>So empty</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CustomCard>
        </Col>
      </Row>
    </Container>
  );
};

export default RequestListScreen;
