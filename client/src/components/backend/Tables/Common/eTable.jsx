import {
  Table,
  Card,
  Button,
  Dropdown,
  ButtonGroup,
  Pagination,
  Nav,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faEllipsisH,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

export default function ETable({
  data = [],
  columns = [],
  onView = () => {},
  onEdit = null,
  onDelete = null,
  title = "",
}) {
  return (
    <Card border="light" className="table-wrapper shadow-sm">
      <Card.Body className="pt-0">
        {title && <h5 className="mb-3">{title}</h5>}

        <div style={{ maxHeight: "600px", overflowY: "auto" }}>
          <Table hover className="user-table align-items-center mb-0">
            <thead className="sticky-top bg-white">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className="border-bottom">
                    {col.label}
                  </th>
                ))}
                <th className="border-bottom">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id || index}>
                  {columns.map((col, idx) => (
                    <td key={idx}>
                      {col.render
                        ? col.render(item[col.key], item, index) // ✅ Pass index here
                        : item[col.key]}
                    </td>
                  ))}
                  <td>
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        as={Button}
                        split
                        variant="link"
                        className="text-dark m-0 p-0"
                      >
                        <span className="icon icon-sm">
                          <FontAwesomeIcon
                            icon={faEllipsisH}
                            className="icon-dark"
                          />
                        </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {onView && (
                          <Dropdown.Item onClick={() => onView(item)}>
                            <FontAwesomeIcon icon={faEye} className="me-2" /> View
                          </Dropdown.Item>
                        )}
                        {onEdit && (
                          <Dropdown.Item onClick={() => onEdit(item.id)}>
                            <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                          </Dropdown.Item>
                        )}
                        {onDelete && (
                          <Dropdown.Item
                            className="text-danger"
                            onClick={() => onDelete(item.id)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{data.length}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}
