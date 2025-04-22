import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listRecipes } from "../actions/recipeActions";

const RecipesScreen = () => {
  const dispatch = useDispatch();
  const recipeList = useSelector((state) => state.recipeList);
  const { recipes, loading, error } = recipeList;

  useEffect(() => {
    dispatch(listRecipes());
  }, [dispatch]);

  return (
    <>
      <h1>Recipes</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          {recipes.map((recipe) => (
            <Col key={recipe._id} sm={12} md={6} lg={4} xl={3}>
              <Card className="my-3 p-3 rounded">
                <Card.Body>
                  <Card.Title as="div">
                    <strong>{recipe.name}</strong>
                  </Card.Title>
                  <Card.Text as="div">
                    <Badge bg="primary" className="me-2">
                      {recipe.classification}
                    </Badge>
                    <Badge bg="secondary" className="me-2">
                      {recipe.source}
                    </Badge>
                  </Card.Text>
                  <Card.Text as="div">
                    <small>Servings: {recipe.servings}</small>
                  </Card.Text>
                  <Button
                    as={Link}
                    to={`/recipe/${recipe._id}`}
                    variant="primary"
                    className="my-2"
                  >
                    View Recipe
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default RecipesScreen;
