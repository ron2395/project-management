import {
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAILURE,
  PROJECT_CREATE_RESET,
  PROJECT_DETAIL_REQUEST,
  PROJECT_DETAIL_SUCCESS,
  PROJECT_DETAIL_FAILURE,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAILURE,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAILURE,
  PROJECT_UPDATE_RESET,
  PROJECT_REMARK_DESTROY_REQUEST,
  PROJECT_REMARK_DESTROY_SUCCESS,
  PROJECT_REMARK_DESTROY_FAILURE,
  PROJECT_REMARK_DESTROY_RESET,
  PROJECT_REMARK_CREATE_REQUEST,
  PROJECT_REMARK_CREATE_SUCCESS,
  PROJECT_REMARK_CREATE_FAILURE,
  PROJECT_REMARK_CREATE_RESET,
  PROJECT_DESTROY_REQUEST,
  PROJECT_DESTROY_SUCCESS,
  PROJECT_DESTROY_FAILURE,
  PROJECT_DESTROY_RESET,
} from "../constants/projectContants";

export const createProjectReducer = (state = {}, action) => {
    switch(action.type){
        case PROJECT_CREATE_REQUEST:
            return { loading: true }
        case PROJECT_CREATE_SUCCESS:
            return { loading: false, success: true, project: action.payload }
        case PROJECT_CREATE_FAILURE:
            return { loading: false, error: action.payload }
        case PROJECT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const projectDetailReducer = (state = { project: {} }, action) => {
    switch(action.type){
        case PROJECT_DETAIL_REQUEST:
            return { loading: true, ...state }
        case PROJECT_DETAIL_SUCCESS:
            return { loading: false, success: true, project: action.payload }
        case PROJECT_DETAIL_FAILURE:
            return { loading: false, error: action.payload }
        default: return state
    }
}

export const projectListReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return { loading: true, projects: [] };
    case PROJECT_LIST_SUCCESS:
      return {
        loading: false,
        projects: action.payload
      };
    case PROJECT_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectUpdateReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_REQUEST:
      return { loading: true };
    case PROJECT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        project: action.payload,
      };
    case PROJECT_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    case PROJECT_UPDATE_RESET:
      return {
        project: {}
      };
    default:
      return state;
  }
};

export const projectRemarkDestroyReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_REMARK_DESTROY_REQUEST:
      return { loading: true };
    case PROJECT_REMARK_DESTROY_SUCCESS:
      return { loading: false, success: true };
    case PROJECT_REMARK_DESTROY_FAILURE:
      return { loading: false, error: action.payload };
    case PROJECT_REMARK_DESTROY_RESET:
      return { loading: false }
    default:
      return state
  }
}

export const projectRemarkCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_REMARK_CREATE_REQUEST:
      return { loading: true }
    case PROJECT_REMARK_CREATE_SUCCESS:
      return { loading: false, success: true }
    case PROJECT_REMARK_CREATE_FAILURE:
      return { loading: false, error: action.payload }
    case PROJECT_REMARK_CREATE_RESET:
      return { success: false }
    default:
      return state;
  }
};

export const projectDestroyReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_DESTROY_REQUEST:
      return { loading: true };
    case PROJECT_DESTROY_SUCCESS:
      return { loading: false, success: true };
    case PROJECT_DESTROY_FAILURE:
      return { loading: false, error: action.payload };
    case PROJECT_DESTROY_RESET:
      return {}
    default:
      return state;
  }
};