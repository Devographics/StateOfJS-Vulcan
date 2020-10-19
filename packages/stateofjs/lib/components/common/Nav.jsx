import React from 'react';
import { useCurrentUser } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { IndexLinkContainer } from 'react-router-bootstrap';
import LocaleSwitcher from './LocaleSwitcher';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const navContents = [
  {
    id: 'nav.surveys',
    to: '/',
  },
];

const loggedInNavContents = [
  {
    id: 'nav.account',
    to: '/account',
  },
];

const adminNavContents = [
  {
    label: 'Stats',
    to: '/admin/stats',
  },
  // {
  //   label: 'Surveys',
  //   to: '/admin/surveys',
  // },
  {
    label: 'Users',
    to: '/admin/users',
  },
  {
    label: 'Responses',
    to: '/admin/responses',
  },
  // {
  //   label: 'Normalized Responses',
  //   to: '/admin/normalized-responses',
  // },
];

const Navigation = () => {
  const { currentUser } = useCurrentUser();
  let navItems = navContents;
  if (currentUser) {
    navItems = [...navItems, ...loggedInNavContents];
    if (Users.isAdmin(currentUser)) {
      navItems = [...navItems, ...adminNavContents];
    }
  }
  return (
    <div className="nav-wrapper">
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav expand="lg">
            {navItems.map((item, i) => (
              <NavItem {...item} key={i} />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="nav-item-locale">
        <LocaleSwitcher />
      </div>
    </div>
  );
};

const NavItem = ({ to, label, id }) => (
  <Nav.Item>
    <IndexLinkContainer to={to}>
      <Nav.Link>{label ? label : <FormattedMessage id={id} />}</Nav.Link>
    </IndexLinkContainer>
  </Nav.Item>
);

export default Navigation;
