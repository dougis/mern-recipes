import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <>
      <h1>Welcome to Recipe Manager</h1>
      <Row>
        <Col>
          <p>Manage your recipes and sources efficiently.</p>
          <Link to="/recipes" className="btn btn-primary">
            View Recipes
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
