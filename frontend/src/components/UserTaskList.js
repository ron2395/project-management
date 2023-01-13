import { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CustomCard from "./CustomCard";
import Task from "./Task";
import Loader from "./Loader";
import Message from "./Message";
import { listProjects } from "../actions/projectActions";
import { listUserTasks } from "../actions/taskActions";

const UserTaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userid } = useParams()

  const taskUserList = useSelector((state) => state.taskUserList);
  const { tasks, loading, error, success } = taskUserList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.role === '2') {
      dispatch(listUserTasks(userid))
      dispatch(listProjects())
    } else {
      navigate("/");
    }
  }, [userInfo, dispatch, navigate, userid]);

  return (
    <CustomCard className=''>
      <Card.Title className='d-flex'>
        <h2 className='mb-3'>Your Tasks</h2>
      </Card.Title>
      <ListGroup>
        {error ? <Message variant='danger'>{error}</Message> : null}
        {loading ? <Loader /> : success && tasks.length ?
        tasks.map((task, i) => <Task key={i} projectid={task.projectId} task={task} />) :
        <h2 className="mt-4">No tasks assigned</h2>}
      </ListGroup>
    </CustomCard>
  );
};

export default UserTaskList;
