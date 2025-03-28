import axios from "axios";

export const listRecipes = () => async (dispatch) => {
  try {
    dispatch({ type: "RECIPE_LIST_REQUEST" });

    const { data } = await axios.get("/api/recipes");

    dispatch({
      type: "RECIPE_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "RECIPE_LIST_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getRecipeById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "RECIPE_DETAILS_REQUEST" });

    const { data } = await axios.get(`/api/recipes/${id}`);

    dispatch({
      type: "RECIPE_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "RECIPE_DETAILS_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createRecipe = (recipe) => async (dispatch, getState) => {
  try {
    dispatch({ type: "RECIPE_CREATE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/recipes", recipe, config);

    dispatch({
      type: "RECIPE_CREATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "RECIPE_CREATE_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateRecipe = (recipe) => async (dispatch, getState) => {
  try {
    dispatch({ type: "RECIPE_UPDATE_REQUEST" });

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
      `/api/recipes/${recipe._id}`,
      recipe,
      config
    );

    dispatch({
      type: "RECIPE_UPDATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "RECIPE_UPDATE_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteRecipe = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "RECIPE_DELETE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/recipes/${id}`, config);

    dispatch({
      type: "RECIPE_DELETE_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "RECIPE_DELETE_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};
