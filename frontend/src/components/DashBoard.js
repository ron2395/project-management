import CustomCard from './CustomCard';
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap';

const DashBoard = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo: user } = userLogin

  const projectList = useSelector(state => state.projectList)
  const { projects } = projectList

  return (
    <CustomCard className='mb-3 bg-dark text-white text-center'>
      <h2 className='text-nowrap'>DASHBOARD</h2>
      <h4>
        {user.firstName} {user.lastName}
      </h4>
      <hr />
      <p>
        <strong>
          Designation:{" "}
          {user.role === "0"
            ? "Admin"
            : user.role === "1"
            ? "Project Manager"
            : user.role === "2"
            ? "Developer"
            : null}
        </strong>
      </p>
      <p>Email: {user.email}</p>
      <p>
        {user.role === "0" ? "Total projects:" : "User Projects:"}{" "}
        {projects ? projects.length : <Spinner />}
      </p>
    </CustomCard>
  );
}

export default DashBoard
