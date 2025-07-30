import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  Navbar, Nav, Form, Image, Container, InputGroup, Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function Topbar() {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role || "user");
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleEditProfile = () => {
    if (role === "admin") navigate("/admin/edit-profile");
    else navigate("/edit-profile");
  };

  return (
    <Navbar variant="light" expanded className="px-4 py-2 bg-white shadow-sm" style={{ position: "sticky", top: 0, zIndex: 1045 }}>
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center" style={{ maxWidth: '400px', flex: '1' }}>
            <Form className="w-100">
              <Form.Group id="topbarSearch" className="mb-0">
                <InputGroup className="input-group-merge search-bar">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>

          <div className="d-flex align-items-center gap-3 ms-3">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as="button" className="btn btn-link p-0 d-flex align-items-center">
                <Image src='/images/team/profile-picture-3.webp' className="user-avatar md-avatar rounded-circle" />
                <span className="ms-2 fw-bold d-none d-md-inline text-dark">Bonnie Green</span>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" className="user-dropdown mt-2">
                <Dropdown.Item onClick={handleEditProfile}>
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
                </Dropdown.Item>
                <Dropdown.Item><FontAwesomeIcon icon={faCog} className="me-2" /> Settings</Dropdown.Item>
                <Dropdown.Item><FontAwesomeIcon icon={faEnvelopeOpen} className="me-2" /> Messages</Dropdown.Item>
                <Dropdown.Item><FontAwesomeIcon icon={faUserShield} className="me-2" /> Support</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
