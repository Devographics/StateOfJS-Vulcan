import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';
import Users from 'meteor/vulcan:users';

const AccountPage = ({ currentUser }) => (
  <div className="account">
    Account Page
  </div>
);

registerComponent('AccountPage', AccountPage, withCurrentUser);

export default AccountPage;
