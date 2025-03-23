import axios from "axios";

export const listSources = () => async (dispatch) => {
  try {
    dispatch({ type: "SOURCE_LIST_REQUEST" });

    const { data } = await axios.get("/api/sources");

    dispatch({
      type: "SOURCE_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "SOURCE_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSourceById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SOURCE_DETAILS_REQUEST" });

    const { data } = await axios.get(`/api/sources/${id}`);

    dispatch({
      type: "SOURCE_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "SOURCE_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSource = (source) => async (dispatch, getState) => {
  try {
    dispatch({ type: "SOURCE_CREATE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/sources", source, config);

    dispatch({
      type: "SOURCE_CREATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "SOURCE_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSource = (source) => async (dispatch, getState) => {
  try {
    dispatch({ type: "SOURCE_UPDATE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/sources/${source._id}`,
      source,
      config
    );

    dispatch({
      type: "SOURCE_UPDATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "SOURCE_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSource = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "SOURCE_DELETE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/sources/${id}`, config);

    dispatch({
      type: "SOURCE_DELETE_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "SOURCE_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
