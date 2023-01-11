import {
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAILURE,
  TASK_CREATE_RESET,
  TASK_DETAIL_REQUEST,
  TASK_DETAIL_SUCCESS,
  TASK_DETAIL_FAILURE,
  TASK_DESTROY_REQUEST,
  TASK_DESTROY_SUCCESS,
  TASK_DESTROY_FAILURE,
  TASK_DESTROY_RESET,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAILURE,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAILURE,
  TASK_UPDATE_RESET,
  TASK_REMARK_DESTROY_REQUEST,
  TASK_REMARK_DESTROY_SUCCESS,
  TASK_REMARK_DESTROY_FAILURE,
  TASK_REMARK_DESTROY_RESET,
  TASK_REMARK_CREATE_REQUEST,
  TASK_REMARK_CREATE_SUCCESS,
  TASK_REMARK_CREATE_FAILURE,
  TASK_REMARK_CREATE_RESET,
  TASK_USER_LIST_REQUEST,
  TASK_USER_LIST_SUCCESS,
  TASK_USER_LIST_FAILURE,
  TASK_REMARK_UPDATE_REQUEST,
  TASK_REMARK_UPDATE_SUCCESS,
  TASK_REMARK_UPDATE_FAILURE,
  TASK_REMARK_UPDATE_RESET
} from "../constants/taskConstants";

export const createTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_CREATE_REQUEST:
      return { loading: true };
    case TASK_CREATE_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case TASK_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    case TASK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskListReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return { loading: true, tasks: [] };
    case TASK_LIST_SUCCESS:
      return {
        loading: false,
        tasks: action.payload,
        success: true
      };
    case TASK_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskDetailReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case TASK_DETAIL_REQUEST:
      return { loading: true, ...state };
    case TASK_DETAIL_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case TASK_DETAIL_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskUpdateReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case TASK_UPDATE_REQUEST:
      return { loading: true };
    case TASK_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        task: action.payload,
      };
    case TASK_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    case TASK_UPDATE_RESET:
      return {
        task: {},
      };
    default:
      return state;
  }
};

export const taskRemarkDestroyReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_REMARK_DESTROY_REQUEST:
      return { loading: true };
    case TASK_REMARK_DESTROY_SUCCESS:
      return { loading: false, success: true };
    case TASK_REMARK_DESTROY_FAILURE:
      return { loading: false, error: action.payload };
    case TASK_REMARK_DESTROY_RESET:
      return { loading: false };
    default:
      return state;
  }
};

export const taskRemarkCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_REMARK_CREATE_REQUEST:
      return { loading: true };
    case TASK_REMARK_CREATE_SUCCESS:
      return { loading: false, success: true };
    case TASK_REMARK_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    case TASK_REMARK_CREATE_RESET:
      return { success: false };
    default:
      return state;
  }
};

export const taskDestroyReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_DESTROY_REQUEST:
      return { loading: true };
    case TASK_DESTROY_SUCCESS:
      return { loading: false, success: true };
    case TASK_DESTROY_FAILURE:
      return { loading: false, error: action.payload };
    case TASK_DESTROY_RESET:
      return {};
    default:
      return state;
  }
};

export const taskUserListReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_USER_LIST_REQUEST:
      return { loading: true, tasks: [] };
    case TASK_USER_LIST_SUCCESS:
      return {
        loading: false,
        tasks: action.payload,
        success: true
      };
    case TASK_USER_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const taskRemarkUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_REMARK_UPDATE_REQUEST:
      return { loading: true };
    case TASK_REMARK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TASK_REMARK_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    case TASK_REMARK_UPDATE_RESET:
      return {};
    default:
      return state;
  }
}