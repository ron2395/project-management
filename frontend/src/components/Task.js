import { Fragment } from "react";
import { LinkContainer } from 'react-router-bootstrap'
import { Button, ListGroup } from "react-bootstrap";

const Task = ({ task }) => {

  return (
    <ListGroup.Item key={task._id}>
      <div className='d-flex justify-content-between'>
        <h5>Task: {task.title.toUpperCase()}</h5>
        <LinkContainer to={`/project/${task.projectId}/task/${task._id}`}>
          <Button variant='primary' className='btn-sm'>Details</Button>
        </LinkContainer>
      </div>
      <hr className='mb-2 mt-1' />
      {task.responsible ? (
        <Fragment>
          <h6 className='d-inline'>Responsible: </h6>
          {task.responsible.firstName} {task.responsible.lastName}
        </Fragment>
      ) : (
        "No developer"
      )}
      <div>
        <h6 className='d-inline'>Status: </h6>
        {task.actualStart && task.actualEnd
          ? "Completed"
          : task.actualStart && !task.actualEnd
          ? "In-Progress"
          : !task.actualStart && !task.actualEnd
          ? "Not started"
          : !task.actualStart && task.actualEnd
          ? "Completed"
          : "No status"}
      </div>
    </ListGroup.Item>
  );
};

export default Task;
