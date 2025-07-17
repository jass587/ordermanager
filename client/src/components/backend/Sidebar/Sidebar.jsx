import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleBar from 'simplebar-react';
import { useLocation, Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUsers,
  faBox,
  faTags,
  faCogs,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { Nav, Badge, Image, Button, Navbar } from 'react-bootstrap';

import { Routes } from "../../../routes";
import ReactHero from "../../../assets/img/technologies/react-hero-logo.svg";
import "./Sidebar.css";

export default function Sidebar(props = {}) {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);

  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const navigate = useNavigate();

  // Decode token to get role
  const token = localStorage.getItem("token");
  let userRole = "user";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role || "user";
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }

  const NavItem = ({ title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary", onClick }) => {
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames} onClick={onClick}>
          <span>
            {icon && <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /></span>}
            {image && <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" />}
            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText && (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          )}
        </Nav.Link>
      </Nav.Item>
    );
  };

  const SectionHeading = ({ title }) => (
    <div className="sidebar-heading text-uppercase fw-bold small text-white mt-4 mb-2 px-3">
      {title}
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/signin";
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>

      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem
                title={userRole === "admin" ? "Admin Panel" : "User Panel"}
                link={userRole === "admin" ? "/admin/dashboard" : "/home"}
                image={ReactHero}
              />

              <SectionHeading title="Dashboard" />
              <NavItem
                title="Overview"
                link={userRole === "admin" ? "/admin/dashboard" : "/home"}
                icon={faTachometerAlt}
              />

              {userRole === "admin" && (
                <>
                  <SectionHeading title="Management" />
                  <NavItem title="Users" link="/admin/users" icon={faUsers} />
                  <NavItem title="Products" link="/admin/products" icon={faBox} />
                  <NavItem title="Categories" link="/admin/categories" icon={faTags} />
                  <NavItem title="Orders" link="/admin/orders" icon={faUsers} />
                  <NavItem title="Payments" link="/admin/payments" icon={faBox} />
                  
                  <SectionHeading title="Settings" />
                  <NavItem title="Site Settings" link="/admin/site-settings" icon={faCogs} />
                </>
              )}

              <SectionHeading title="Account" />
              <NavItem title="Sign Out" icon={faSignOutAlt} onClick={handleLogout} />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
}
