import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  getSourceById,
  createSource,
  updateSource,
} from "../actions/sourceActions";

const sourceSchema = Yup.object().shape({
  source: Yup.string().required("Source name is required"),
});

const SourceEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sourceDetails = useSelector((state) => state.sourceDetails);
  const { loading, error, source: sourceData } = sourceDetails;

  const sourceCreate = useSelector((state) => state.sourceCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = sourceCreate;

  const sourceUpdate = useSelector((state) => state.sourceUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = sourceUpdate;

  useEffect(() => {
    if (successCreate || successUpdate) {
      toast.success(
        id ? "Source updated successfully" : "Source created successfully"
      );
      dispatch({ type: id ? "SOURCE_UPDATE_RESET" : "SOURCE_CREATE_RESET" });
      navigate("/sources");
    }
  }, [dispatch, navigate, id, successCreate, successUpdate]);

  useEffect(() => {
    if (id) {
      dispatch(getSourceById(id));
    }
  }, [dispatch, id]);

  const initialValues = {
    source: sourceData?.source || "",
  };

  const handleSubmit = (values) => {
    if (id) {
      dispatch(updateSource({ ...values, _id: id }));
    } else {
      dispatch(createSource(values));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{id ? "Edit Source" : "Create Source"}</h1>
        <Button variant="light" onClick={() => navigate("/sources")}>
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
        validationSchema={sourceSchema}
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
            <Form.Group className="mb-3" controlId="source">
              <Form.Label>Source Name</Form.Label>
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

            <Button
              type="submit"
              variant="primary"
              disabled={
                isSubmitting || loading || loadingCreate || loadingUpdate
              }
            >
              {id ? "Update Source" : "Create Source"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SourceEditScreen;
