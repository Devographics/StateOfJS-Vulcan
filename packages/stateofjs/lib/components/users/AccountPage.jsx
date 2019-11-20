import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';
import Users from 'meteor/vulcan:users';

const AccountPage = ({ currentUser }) => (
  <div className="account">
    {currentUser && <p>Logged in as {currentUser.email}</p>}
    <Components.AccountsLoginForm />
  </div>
);

registerComponent('AccountPage', AccountPage, withCurrentUser);

export default AccountPage;
