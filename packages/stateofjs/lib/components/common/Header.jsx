import React from 'react';
import { useCurrentUser } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { IndexLinkContainer } from 'react-router-bootstrap';
import LocaleSwitcher from './LocaleSwitcher';

const NavLink = ({ to, label }) => (
  <IndexLinkContainer to={to}>
    <Nav.Link>{label}</Nav.Link>
  </IndexLinkContainer>
);

const Header = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div className="header">
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav variant="tabs" expand="lg">
            <NavLink to="/" label="Survey" />
            {currentUser && <NavLink to="/account" label="Account" />}
            {Users.isAdmin(currentUser) && (
              <>
                <NavLink to="/admin/surveys" label="Surveys" /> <NavLink to="/admin/responses" label="Responses" />
                <NavLink to="/admin/users" label="Users" />
                {/* <NavLink to="/admin/emails" label="Emails" /> */}
                <NavLink to="/admin/database" label="Database" />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <LocaleSwitcher/>
    </div>
  );
};

export default Header;
