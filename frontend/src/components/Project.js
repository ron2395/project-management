import { Button, ListGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

const Project = ({ project }) => {
  const navigate = useNavigate()

  const projectPageHandler = (id) => {
    navigate(`/project/${id}`)
  }

  return (
    <ListGroup.Item key={project._id} className='d-flex'>
      <div>
        <h5>{project.title.toUpperCase()}</h5>
        <hr />
        <p>
          {project.manager
            ? `Manager: ${project.manager.firstName} ${project.manager.lastName}`
            : "No manager assigned"}
        </p>
        <span>Status: </span>
          {project.actualStart && project.actualEnd
            ? "Completed"
            : project.actualStart && !project.actualEnd
            ? "In-Progress"
            : !project.actualStart && !project.actualEnd
            ? "Not started"
            : !project.actualStart && project.actualEnd
            ? "Completed"
            : "No status"}
      </div>
      <Button
        onClick={() => projectPageHandler(project._id)}
        className='ms-auto btn my-auto btn-dark'
      >
        Details
      </Button>
    </ListGroup.Item>
  );
}

export default Project
