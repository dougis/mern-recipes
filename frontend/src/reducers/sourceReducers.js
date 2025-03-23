export const sourceListReducer = (state = { sources: [] }, action) => {
  switch (action.type) {
    case "SOURCE_LIST_REQUEST":
      return { loading: true, sources: [] };
    case "SOURCE_LIST_SUCCESS":
      return { loading: false, sources: action.payload };
    case "SOURCE_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sourceDetailsReducer = (state = { source: {} }, action) => {
  switch (action.type) {
    case "SOURCE_DETAILS_REQUEST":
      return { loading: true, ...state };
    case "SOURCE_DETAILS_SUCCESS":
      return { loading: false, source: action.payload };
    case "SOURCE_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sourceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "SOURCE_CREATE_REQUEST":
      return { loading: true };
    case "SOURCE_CREATE_SUCCESS":
      return { loading: false, success: true, source: action.payload };
    case "SOURCE_CREATE_FAIL":
      return { loading: false, error: action.payload };
    case "SOURCE_CREATE_RESET":
      return {};
    default:
      return state;
  }
};

export const sourceUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "SOURCE_UPDATE_REQUEST":
      return { loading: true };
    case "SOURCE_UPDATE_SUCCESS":
      return { loading: false, success: true, source: action.payload };
    case "SOURCE_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "SOURCE_UPDATE_RESET":
      return {};
    default:
      return state;
  }
};

export const sourceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "SOURCE_DELETE_REQUEST":
      return { loading: true };
    case "SOURCE_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "SOURCE_DELETE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
