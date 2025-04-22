import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import {
  recipeListReducer,
  recipeDetailsReducer,
  recipeCreateReducer,
  recipeUpdateReducer,
  recipeDeleteReducer,
} from "./reducers/recipeReducers";
import {
  sourceListReducer,
  sourceDetailsReducer,
  sourceCreateReducer,
  sourceUpdateReducer,
  sourceDeleteReducer,
} from "./reducers/sourceReducers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    recipeList: recipeListReducer,
    recipeDetails: recipeDetailsReducer,
    recipeCreate: recipeCreateReducer,
    recipeUpdate: recipeUpdateReducer,
    recipeDelete: recipeDeleteReducer,
    sourceList: sourceListReducer,
    sourceDetails: sourceDetailsReducer,
    sourceCreate: sourceCreateReducer,
    sourceUpdate: sourceUpdateReducer,
    sourceDelete: sourceDeleteReducer,
  },
});

export default store;
