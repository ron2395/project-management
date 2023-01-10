import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo: user } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>Project management</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ms-auto'>
              {!user ? <Nav.Link href='/login'>Login</Nav.Link> : null}
              {user && user.role === "0" ? (
                <NavDropdown title='Panel' id='basic-nav-dropdown'>
                  <NavDropdown.Item href='/admin/userlist'>All Users</NavDropdown.Item>
                  <NavDropdown.Item href='/'>All Projects</NavDropdown.Item>
                </NavDropdown>
              ) : null}
              {user ? (
                <NavDropdown
                  title={`${user.firstName}`}
                  id='basic-nav-dropdown'
                >
                  <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                  {user && user.role === '2' ? 
                  <NavDropdown.Item href='/usertasks'>Your tasks</NavDropdown.Item>
                : null}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header
