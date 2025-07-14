
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  Navbar, Nav, Form, Image, Container, ListGroup, InputGroup,
  Dropdown
} from "react-bootstrap";
import NOTIFICATIONS_DATA from "../../data/notifications"
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { useNavigate } from "react-router-dom";


export default (props) => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const areNotificationsRead = notifications.reduce((acc, notif) => acc && notif.read, true);
  const navigate = useNavigate();

  const markNotificationsAsRead = () => {
    setTimeout(() => {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }, 300);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/signin");
  };

    const handleEditProfile = () => {
    navigate("/admin/edit-profile");
  };
  const Notification = (props) => {
    const { link, sender, image, time, message, read = false } = props;
    const readClassName = read ? "" : "text-danger";

    return (
      <ListGroup.Item action href={link} className="border-bottom border-light">
        <Row className="align-items-center">
          <Col className="col-auto">
            <Image src={image} className="user-avatar lg-avatar rounded-circle" />
          </Col>
          <Col className="ps-0 ms--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">{sender}</h4>
              </div>
              <div className="text-end">
                <small className={readClassName}>{time}</small>
              </div>
            </div>
            <p className="font-small mt-1 mb-0">{message}</p>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Navbar variant="light" expanded className="px-4 py-2 bg-white shadow-sm">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Search on left */}
          <div className="d-flex align-items-center" style={{ maxWidth: '400px', flex: '1' }}>
            <Form className="w-100">
              <Form.Group id="topbarSearch" className="mb-0">
                <InputGroup className="input-group-merge search-bar">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>

          {/* Notifications and Profile on right */}
          <div className="d-flex align-items-center gap-3 ms-3">
            <Dropdown as={Nav.Item} onToggle={markNotificationsAsRead}>
              <Dropdown.Toggle as="button" className="btn btn-link text-dark p-0 position-relative">
                <FontAwesomeIcon icon={faBell} className="fs-5" />
                {!areNotificationsRead && (
                  <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-lg mt-2 py-0">
                <ListGroup className="list-group-flush">
                  <ListGroup.Item className="text-center fw-bold py-2">Notifications</ListGroup.Item>
                  {notifications.map((n) => <Notification key={`notification-${n.id}`} {...n} />)}
                  <Dropdown.Item className="text-center text-primary fw-bold py-2">View all</Dropdown.Item>
                </ListGroup>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as="button" className="btn btn-link p-0 d-flex align-items-center">
                <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
                <span className="ms-2 fw-bold d-none d-md-inline text-dark">Bonnie Green</span>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" className="user-dropdown mt-2">
                <Dropdown.Item onClick={handleEditProfile} ><FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile</Dropdown.Item>
                <Dropdown.Item><FontAwesomeIcon icon={faCog} className="me-2" /> Settings</Dropdown.Item>
                <Dropdown.Item><FontAwesomeIcon icon={faEnvelopeOpen} className="me-2" /> Messages</Dropdown.Item>
                <Dropdown.Item><FontAwesomeIcon icon={faUserShield} className="me-2" /> Support</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} ><FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2"/> Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Container>
    </Navbar>

  );
};
