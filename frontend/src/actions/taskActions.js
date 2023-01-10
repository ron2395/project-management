import API from "../api";
import {
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAILURE,
  TASK_DETAIL_REQUEST,
  TASK_DETAIL_SUCCESS,
  TASK_DETAIL_FAILURE,
  TASK_DESTROY_REQUEST,
  TASK_DESTROY_SUCCESS,
  TASK_DESTROY_FAILURE,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAILURE,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAILURE,
  TASK_REMARK_CREATE_REQUEST,
  TASK_REMARK_CREATE_SUCCESS,
  TASK_REMARK_CREATE_FAILURE,
  TASK_REMARK_DESTROY_REQUEST,
  TASK_REMARK_DESTROY_SUCCESS,
  TASK_REMARK_DESTROY_FAILURE,
  TASK_USER_LIST_REQUEST,
  TASK_USER_LIST_SUCCESS,
  TASK_USER_LIST_FAILURE,
} from "../constants/taskConstants";

export const createTask = (
  title,
  plannedStart,
  plannedEnd,
  description,
  manager,
  responsible,
  projectId
  ) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await API.post(
      `/projects/${projectId}/tasks`,
      {
        title,
        plannedStart,
        plannedEnd,
        description,
        manager,
        responsible
      },
      config
    );

    dispatch({
      type: TASK_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTaskDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DETAIL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await API.get(`/tasks/${id}`, config);

    dispatch({
      type: TASK_DETAIL_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TASK_DETAIL_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTasks = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await API.get(`/projects/${id}/tasks`, config);

    dispatch({ type: TASK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTaskDetail =
  (actualStart, actualEnd, id) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TASK_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const task = {
        actualStart,
        actualEnd
      };

      const { data } = await API.put(`/tasks/${id}`, task, config);

      dispatch({
        type: TASK_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TASK_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteTaskRemark =
  (taskId, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TASK_REMARK_DESTROY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      await API.delete(`/tasks/${taskId}/remarks/${id}`, config);

      dispatch({
        type: TASK_REMARK_DESTROY_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TASK_REMARK_DESTROY_FAILURE,
        payload: error,
      });
    }
  };

export const createTaskRemark = (taskId, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TASK_REMARK_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      await API.post(`/tasks/${taskId}/remarks`, { comment }, config);

      dispatch({
        type: TASK_REMARK_CREATE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TASK_REMARK_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const destroyTask = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DESTROY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await API.delete(`/tasks/${id}`, config);

    dispatch({
      type: TASK_DESTROY_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TASK_DESTROY_FAILURE,
      payload: error,
    });
  }
};

export const listUserTasks = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await API.get(`/tasks/user/${id}`, config);

    dispatch({ type: TASK_USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_USER_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};