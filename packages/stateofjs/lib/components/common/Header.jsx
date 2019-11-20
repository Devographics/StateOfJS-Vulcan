import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';
import Users from 'meteor/vulcan:users';
import Nav from 'react-bootstrap/Nav';
import { IndexLinkContainer} from 'react-router-bootstrap';

const NavLink = ({ to, label }) => (
  <Nav.Item eventKey={to}>
    <IndexLinkContainer to={to}>
      <Nav.Link>{label}</Nav.Link>
    </IndexLinkContainer>
  </Nav.Item>
);

const Header = ({ currentUser }) => (
  <div className="header">
    <Nav variant="tabs">
      <NavLink to="/" label="Survey" />
      {currentUser && <NavLink to="/account" label="Account" />}
      {Users.isAdmin(currentUser) && (
        <>
          <NavLink to="/admin/surveys" label="Surveys Dashboard" />{' '}
          <NavLink to="/admin/responses" label="Responses Dashboard" />
          <NavLink to="/admin/users" label="Users Dashboard" />
        </>
      )}
    </Nav>
  </div>
);

registerComponent('Header', Header, withCurrentUser);

export default Header;
