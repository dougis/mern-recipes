import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listSources } from "../actions/sourceActions";

const SourcesScreen = () => {
  const dispatch = useDispatch();
  const sourceList = useSelector((state) => state.sourceList);
  const { sources, loading, error } = sourceList;

  useEffect(() => {
    dispatch(listSources());
  }, [dispatch]);

  return (
    <>
      <h1>Sources</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          {sources.map((source) => (
            <Col key={source._id} sm={12} md={6} lg={4} xl={3}>
              <Card className="my-3 p-3 rounded">
                <Card.Body>
                  <Card.Title as="div">
                    <strong>{source.source}</strong>
                  </Card.Title>
                  <Button
                    as={Link}
                    to={`/source/${source._id}`}
                    variant="primary"
                    className="my-2"
                  >
                    View Details
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

export default SourcesScreen;
