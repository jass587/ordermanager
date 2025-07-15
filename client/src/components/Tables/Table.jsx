import { useEffect, useState } from "react";
import { Table, Card, Button, Dropdown, ButtonGroup, Pagination, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
      });
  }, []);

  const TableRow = ({ id, name, createdAt, updatedAt }) => (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
      <td>{new Date(updatedAt).toLocaleDateString()}</td>
      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
            </Dropdown.Item>
            <Dropdown.Item className="text-danger">
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Name</th>
              <th className="border-bottom">Created At</th>
              <th className="border-bottom">Updated At</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <TableRow key={`category-${cat.id}`} {...cat} />
            ))}
          </tbody>
        </Table>

        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{categories.length}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
