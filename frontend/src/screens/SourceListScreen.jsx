import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table, Form, Pagination } from "react-bootstrap";
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { listSources, deleteSource } from "../actions/sourceActions";
import { savePreferences, loadPreferences } from "../utils/preferences";

const ITEMS_PER_PAGE = 10;

const SourceListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("source");
  const [sortDirection, setSortDirection] = useState("asc");

  const sourceList = useSelector((state) => state.sourceList);
  const { loading, error, sources } = sourceList;

  const sourceDelete = useSelector((state) => state.sourceDelete);
  const { success: successDelete } = sourceDelete;

  // Load saved preferences
  useEffect(() => {
    const savedPreferences = loadPreferences("sourceListPreferences", {
      searchTerm: "",
      sortField: "source",
      sortDirection: "asc",
    });
    setSearchTerm(savedPreferences.searchTerm);
    setSortField(savedPreferences.sortField);
    setSortDirection(savedPreferences.sortDirection);
  }, []);

  // Save preferences when they change
  useEffect(() => {
    savePreferences("sourceListPreferences", {
      searchTerm,
      sortField,
      sortDirection,
    });
  }, [searchTerm, sortField, sortDirection]);

  useEffect(() => {
    if (successDelete) {
      toast.success("Source deleted successfully");
      dispatch(listSources());
    }
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this source?")) {
      dispatch(deleteSource(id));
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

  const filteredSources = sources
    ?.filter((source) =>
      Object.values(source).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

  const totalPages = Math.ceil((filteredSources?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSources = filteredSources?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Sources</h1>
        <Button variant="primary" onClick={() => navigate("/sources/create")}>
          Add New Source
        </Button>
      </div>

      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search sources..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when search changes
          }}
        />
      </Form.Group>

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
                  onClick={() => handleSort("source")}
                >
                  Source {getSortIcon("source")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSources?.map((source) => (
                <tr key={source._id}>
                  <td>{source.source}</td>
                  <td>
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={() => navigate(`/sources/${source._id}/edit`)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(source._id)}
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

export default SourceListScreen;
