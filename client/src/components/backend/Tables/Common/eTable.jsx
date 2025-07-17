import { Table, Card, Button, Dropdown, ButtonGroup, Pagination, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEllipsisH, faEye } from "@fortawesome/free-solid-svg-icons";

export default function ETable({
  data = [],
  columns = [],
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  title = "",
}) {
  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {title && <h5 className="mb-3">{title}</h5>}
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="border-bottom">{col.label}</th>
              ))}
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {columns.map((col, idx) => (
                  <td key={idx}>
                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                  </td>
                ))}
                <td>
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                      <span className="icon icon-sm">
                        <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => onView(item.id)}>
                        <FontAwesomeIcon icon={faEye} className="me-2" /> View
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => onEdit(item.id)}>
                        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                      </Dropdown.Item>
                      <Dropdown.Item className="text-danger" onClick={() => onDelete(item.id)}>
                        <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
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
            Showing <b>{data.length}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}
