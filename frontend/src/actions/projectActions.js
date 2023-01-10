import API from '../api'
import {
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAILURE,
  PROJECT_DETAIL_REQUEST,
  PROJECT_DETAIL_SUCCESS,
  PROJECT_DETAIL_FAILURE,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAILURE,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAILURE,
  PROJECT_REMARK_DESTROY_REQUEST,
  PROJECT_REMARK_DESTROY_SUCCESS,
  PROJECT_REMARK_DESTROY_FAILURE,
  PROJECT_REMARK_CREATE_REQUEST,
  PROJECT_REMARK_CREATE_SUCCESS,
  PROJECT_REMARK_CREATE_FAILURE,
  PROJECT_DESTROY_REQUEST,
  PROJECT_DESTROY_SUCCESS,
  PROJECT_DESTROY_FAILURE,
} from "../constants/projectContants";

export const createProject = (title, plannedStart, plannedEnd, description, manager) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PROJECT_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await API.post('/projects', {
            title,
            plannedStart,
            plannedEnd,
            description,
            manager
        }, config)

        dispatch({
            type: PROJECT_CREATE_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: PROJECT_CREATE_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}

export const listProjectDetail = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PROJECT_DETAIL_REQUEST
        })

        const {
          userLogin: { userInfo },
        } = getState();

        const config = {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await API.get(`/projects/${id}`, config)
        
        dispatch({
            type: PROJECT_DETAIL_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: PROJECT_DETAIL_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message
        })
    }
}

export const listProjects = () => async (dispatch, getState) => {
    try {
      dispatch({ type: PROJECT_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await API.get(`/projects`, config);
      
      dispatch({ type: PROJECT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PROJECT_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProjectDetail = (title, actualStart, actualEnd, description, developers, id) => async(dispatch, getState) => {
    try {dispatch({
      type: PROJECT_UPDATE_REQUEST
    })
      
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const project = {
      title,
      actualStart,
      actualEnd,
      description,
      developers
    };

    const { data } = await API.put(`/projects/${id}`, project, config);


    dispatch({
      type: PROJECT_UPDATE_SUCCESS,
      payload: data,
    });
    } catch(error){
      dispatch({
        type: PROJECT_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

export const deleteProjectRemark = (projectId, id) => async(dispatch, getState) => {
  try{dispatch({
    type: PROJECT_REMARK_DESTROY_REQUEST
  })

  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      authorization: `Bearer ${userInfo.token}`,
    },
  }
  await API.delete(`/projects/${projectId}/remarks/${id}`, config)

  dispatch({
    type: PROJECT_REMARK_DESTROY_SUCCESS
  })}catch (error) {
    dispatch({
      type: PROJECT_REMARK_DESTROY_FAILURE,
      payload: error,
    });
  }
}

export const createProjectRemark = (projectId, comment) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PROJECT_REMARK_CREATE_REQUEST,
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

      await API.post(`/projects/${projectId}/remarks`,
            { comment },
              config
            );

      dispatch({
        type: PROJECT_REMARK_CREATE_SUCCESS
      })
      
    } catch (error) {
      dispatch({
        type: PROJECT_REMARK_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

export const destroyProject = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROJECT_DESTROY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await API.delete(`/projects/${id}`, config);

      dispatch({
        type: PROJECT_DESTROY_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PROJECT_DESTROY_FAILURE,
        payload: error,
      });
    }
  }