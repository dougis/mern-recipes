import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  getRecipeById,
  createRecipe,
  updateRecipe,
} from "../actions/recipeActions";

const recipeSchema = Yup.object().shape({
  recipeKey: Yup.string().required("Recipe key is required"),
  name: Yup.string().required("Name is required"),
  ingredients: Yup.string().required("Ingredients are required"),
  instructions: Yup.string().required("Instructions are required"),
  servings: Yup.number()
    .required("Servings are required")
    .min(1, "Servings must be at least 1"),
  classification: Yup.string().required("Classification is required"),
  source: Yup.string().required("Source is required"),
  notes: Yup.string(),
});

const RecipeEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recipeDetails = useSelector((state) => state.recipeDetails);
  const { loading, error, recipe: recipeData } = recipeDetails;

  const recipeCreate = useSelector((state) => state.recipeCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = recipeCreate;

  const recipeUpdate = useSelector((state) => state.recipeUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = recipeUpdate;

  useEffect(() => {
    if (successCreate || successUpdate) {
      toast.success(
        id ? "Recipe updated successfully" : "Recipe created successfully",
      );
      dispatch({ type: id ? "RECIPE_UPDATE_RESET" : "RECIPE_CREATE_RESET" });
      navigate("/recipes");
    }
  }, [dispatch, navigate, id, successCreate, successUpdate]);

  useEffect(() => {
    if (id) {
      dispatch(getRecipeById(id));
    }
  }, [dispatch, id]);

  const initialValues = {
    recipeKey: recipeData?.recipeKey || "",
    name: recipeData?.name || "",
    ingredients: recipeData?.ingredients || "",
    instructions: recipeData?.instructions || "",
    servings: recipeData?.servings || "",
    classification: recipeData?.classification || "",
    source: recipeData?.source || "",
    notes: recipeData?.notes || "",
  };

  const handleSubmit = (values) => {
    if (id) {
      dispatch(updateRecipe({ ...values, _id: id }));
    } else {
      dispatch(createRecipe(values));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{id ? "Edit Recipe" : "Create Recipe"}</h1>
        <Button variant="light" onClick={() => navigate("/recipes")}>
          Go Back
        </Button>
      </div>

      {(loading || loadingCreate || loadingUpdate) && <div>Loading...</div>}
      {(error || errorCreate || errorUpdate) && (
        <div className="alert alert-danger">
          {error || errorCreate || errorUpdate}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={recipeSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="recipeKey">
                  <Form.Label>Recipe Key</Form.Label>
                  <Form.Control
                    type="text"
                    name="recipeKey"
                    value={values.recipeKey}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.recipeKey && errors.recipeKey}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.recipeKey}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="ingredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="ingredients"
                value={values.ingredients}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.ingredients && errors.ingredients}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ingredients}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="instructions">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="instructions"
                value={values.instructions}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.instructions && errors.instructions}
              />
              <Form.Control.Feedback type="invalid">
                {errors.instructions}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="servings">
                  <Form.Label>Servings</Form.Label>
                  <Form.Control
                    type="number"
                    name="servings"
                    value={values.servings}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.servings && errors.servings}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.servings}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="classification">
                  <Form.Label>Classification</Form.Label>
                  <Form.Control
                    type="text"
                    name="classification"
                    value={values.classification}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.classification && errors.classification}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.classification}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="source">
                  <Form.Label>Source</Form.Label>
                  <Form.Control
                    type="text"
                    name="source"
                    value={values.source}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.source && errors.source}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.source}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="notes"
                value={values.notes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              disabled={
                isSubmitting || loading || loadingCreate || loadingUpdate
              }
            >
              {id ? "Update Recipe" : "Create Recipe"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RecipeEditScreen;
