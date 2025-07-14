import { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
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
import { Nav, Badge, Image, Button,Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import ReactHero from "../../assets/img/technologies/react-hero-logo.svg";
import "./Sidebar.css";

export default function Sidebar(props = {}) {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const NavItem = ({ title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" }) => {
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
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
              <NavItem title="Admin Panel" link={Routes.Presentation.path} image={ReactHero} />

              <SectionHeading title="Dashboard" />
              <NavItem title="Overview" link={Routes.DashboardOverview.path} icon={faTachometerAlt} />

              <SectionHeading title="Management" />
              <NavItem title="Users" link="/admin/users" icon={faUsers} />
              <NavItem title="Products" link="/admin/products" icon={faBox} />
              <NavItem title="Categories" link="/admin/categories" icon={faTags} />

              <SectionHeading title="Settings" />
              <NavItem title="Site Settings" link={Routes.Settings.path} icon={faCogs} />

              <SectionHeading title="Account" />
              <NavItem title="Sign Out" link="/signin" icon={faSignOutAlt} />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
}
