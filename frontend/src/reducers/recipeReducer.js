const initialState = {
  recipes: [],
  recipe: {},
  loading: false,
  error: null,
  pages: 1,
  page: 1,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECIPE_LIST_REQUEST":
      return { ...state, loading: true };
    case "RECIPE_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        recipes: action.payload.recipes,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case "RECIPE_LIST_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "RECIPE_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "RECIPE_DETAILS_SUCCESS":
      return { ...state, loading: false, recipe: action.payload };
    case "RECIPE_DETAILS_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "RECIPE_CREATE_REQUEST":
      return { ...state, loading: true };
    case "RECIPE_CREATE_SUCCESS":
      return {
        ...state,
        loading: false,
        recipes: [...state.recipes, action.payload],
      };
    case "RECIPE_CREATE_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "RECIPE_UPDATE_REQUEST":
      return { ...state, loading: true };
    case "RECIPE_UPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
        recipes: state.recipes.map((recipe) =>
          recipe._id === action.payload._id ? action.payload : recipe,
        ),
        recipe: action.payload,
      };
    case "RECIPE_UPDATE_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "RECIPE_DELETE_REQUEST":
      return { ...state, loading: true };
    case "RECIPE_DELETE_SUCCESS":
      return {
        ...state,
        loading: false,
        recipes: state.recipes.filter(
          (recipe) => recipe._id !== action.payload,
        ),
        recipe: {},
      };
    case "RECIPE_DELETE_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default recipeReducer;
