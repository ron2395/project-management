import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import NewProjectScreen from './screens/NewProjectScreen';
import ProjectScreen from './screens/ProjectScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import RequestListScreen from './screens/RequestListScreen'
import UserEditScreen from './screens/UserEditScreen';
import ProjectEditScreen from './screens/ProjectEditScreen';
import NewTaskScreen from './screens/NewTaskScreen';
import TaskScreen from './screens/TaskScreen';
import TaskEditScreen from './screens/TaskEditScreen';
import ProjectRemarkEditScreen from './screens/ProjectRemarkEditScreen';
import TaskRemarkEditScreen from './screens/TaskRemarkEditScreen';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container className='my-4 main-container'>
          <Routes>
            <Route path='/usertasks/:userid' element={<HomeScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/admin'>
              <Route path='requests' element={<RequestListScreen />} />
              <Route path='userlist' element={<UserListScreen />} />
              <Route path='user/:id/edit' element={<UserEditScreen />} />
            </Route>
            <Route path='/project'>
              <Route path=':id/edit' element={<ProjectEditScreen />} />
              <Route path='new' element={<NewProjectScreen />} />
              <Route path=':id' element={<ProjectScreen />} />
              <Route path=':id/task/new' element={<NewTaskScreen />} />
              <Route
                path=':id/remark/:remarkid/edit'
                element={<ProjectRemarkEditScreen />}
              />
            </Route>
            <Route path='/task'>
              <Route path=':taskid/' element={<TaskScreen />} />
              <Route path=':taskid/edit' element={<TaskEditScreen />} />
              <Route
                path=':taskid/remark/:remarkid/edit'
                element={<TaskRemarkEditScreen />}
              />
            </Route>
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
