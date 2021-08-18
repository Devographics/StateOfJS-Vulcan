import React from 'react';
import { Components, useCurrentUser } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { IndexLinkContainer } from 'react-router-bootstrap';
import LocaleSwitcher from './LocaleSwitcher';

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
  {
    label: 'Normalization',
    to: '/admin/normalization',
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
      <Navbar collapseOnSelect expand="lg" variant="dark" aria-labelledby="global-nav">
        <p className="hidden" id="global-nav">
          <Components.FormattedMessage id={'general.global_nav'} />
        </p>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav expand="lg">
            {navItems.map((item, i) => {
              return <NavItem {...item} key={i} />
            })}
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
      <Nav.Link>{label ? label : <Components.FormattedMessage id={id} />}</Nav.Link>
    </IndexLinkContainer>
  </Nav.Item>
);

export default Navigation;
