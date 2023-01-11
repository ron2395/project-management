import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducer,
  userLoginReducer,
  userLogoutReducer,
  userDetailsReducer,
  userProfileReducer,
  userListReducer,
  userDestroyReducer,
  userUpdateReducer,
  userListByRoleReducer,
  userProfileUpdateReducer,
} from "../reducers/userReducers";
import {
  createProjectReducer,
  projectDetailReducer,
  projectListReducer,
  projectRemarkCreateReducer,
  projectRemarkDestroyReducer,
  projectUpdateReducer,
  projectDestroyReducer,
  projectRemarkUpdateReducer,
} from "../reducers/projectReducers";
import {
  createTaskReducer,
  taskDetailReducer,
  taskListReducer,
  taskDestroyReducer,
  taskRemarkCreateReducer,
  taskRemarkDestroyReducer,
  taskUpdateReducer,
  taskUserListReducer,
  taskRemarkUpdateReducer,
} from "../reducers/taskReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userRegistration: userRegisterReducer,
  userLogout: userLogoutReducer,
  userDetails: userDetailsReducer,
  userDestroy: userDestroyReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userListByRole: userListByRoleReducer,
  projectCreate: createProjectReducer,
  projectDetail: projectDetailReducer,
  projectList: projectListReducer,
  projectUpdate: projectUpdateReducer,
  projectRemarkDestroy: projectRemarkDestroyReducer,
  projectRemarkCreate: projectRemarkCreateReducer,
  projectDestroy: projectDestroyReducer,
  projectRemarkUpdate: projectRemarkUpdateReducer,
  taskCreate: createTaskReducer,
  taskList: taskListReducer,
  taskDetail: taskDetailReducer,
  taskDestroy: taskDestroyReducer,
  taskRemarkCreate: taskRemarkCreateReducer,
  taskRemarkDestroy: taskRemarkDestroyReducer,
  taskUpdate: taskUpdateReducer,
  taskUserList: taskUserListReducer,
  taskRemarkUpdate: taskRemarkUpdateReducer
});

const userInfoInStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
    userLogin: { userInfo: userInfoInStorage },
  };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;