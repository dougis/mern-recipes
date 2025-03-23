import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table, Form, Row, Col, Pagination } from "react-bootstrap";
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { listRecipes, deleteRecipe } from "../actions/recipeActions";
import { savePreferences, loadPreferences } from "../utils/preferences";

const ITEMS_PER_PAGE = 10;

const RecipeListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filters, setFilters] = useState({
    classification: "",
    source: "",
  });

  const recipeList = useSelector((state) => state.recipeList);
  const { loading, error, recipes } = recipeList;

  const recipeDelete = useSelector((state) => state.recipeDelete);
  const { success: successDelete } = recipeDelete;

  // Load saved preferences
  useEffect(() => {
    const savedPreferences = loadPreferences("recipeListPreferences", {
      searchTerm: "",
      sortField: "name",
      sortDirection: "asc",
      filters: { classification: "", source: "" },
    });
    setSearchTerm(savedPreferences.searchTerm);
    setSortField(savedPreferences.sortField);
    setSortDirection(savedPreferences.sortDirection);
    setFilters(savedPreferences.filters);
  }, []);

  // Save preferences when they change
  useEffect(() => {
    savePreferences("recipeListPreferences", {
      searchTerm,
      sortField,
      sortDirection,
      filters,
    });
  }, [searchTerm, sortField, sortDirection, filters]);

  useEffect(() => {
    if (successDelete) {
      toast.success("Recipe deleted successfully");
      dispatch(listRecipes());
    }
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(id));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ms-1" />;
    return sortDirection === "asc" ? (
      <FaSortUp className="ms-1" />
    ) : (
      <FaSortDown className="ms-1" />
    );
  };

  const filteredRecipes = recipes
    ?.filter((recipe) => {
      const matchesSearch = Object.values(recipe).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesClassification =
        !filters.classification ||
        recipe.classification === filters.classification;
      const matchesSource =
        !filters.source || recipe.source?.source === filters.source;
      return matchesSearch && matchesClassification && matchesSource;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

  const totalPages = Math.ceil((filteredRecipes?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecipes = filteredRecipes?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const classifications = [...new Set(recipes?.map((r) => r.classification))];
  const sources = [...new Set(recipes?.map((r) => r.source?.source))];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Recipes</h1>
        <Button variant="primary" onClick={() => navigate("/recipes/create")}>
          Add New Recipe
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when search changes
              }}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Select
              value={filters.classification}
              onChange={(e) => {
                setFilters({ ...filters, classification: e.target.value });
                setCurrentPage(1); // Reset to first page when filter changes
              }}
            >
              <option value="">All Classifications</option>
              {classifications.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Select
              value={filters.source}
              onChange={(e) => {
                setFilters({ ...filters, source: e.target.value });
                setCurrentPage(1); // Reset to first page when filter changes
              }}
            >
              <option value="">All Sources</option>
              {sources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("recipeKey")}
                >
                  Key {getSortIcon("recipeKey")}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("name")}
                >
                  Name {getSortIcon("name")}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("source")}
                >
                  Source {getSortIcon("source")}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("classification")}
                >
                  Classification {getSortIcon("classification")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecipes?.map((recipe) => (
                <tr key={recipe._id}>
                  <td>{recipe.recipeKey}</td>
                  <td>{recipe.name}</td>
                  <td>{recipe.source?.source}</td>
                  <td>{recipe.classification}</td>
                  <td>
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={() => navigate(`/recipes/${recipe._id}/edit`)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(recipe._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {totalPages > 1 && (
            <Pagination className="justify-content-center">
              <Pagination.First
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          )}
        </>
      )}
    </>
  );
};

export default RecipeListScreen;
