import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';
import Users from 'meteor/vulcan:users';

const AccountPage = ({ currentUser }) => (
  <div className="contents-narrow account">
    {currentUser && <p>Logged in as {currentUser.email}</p>}
    <Components.AccountsLoginForm />
    <p>
      If you have any questions about how we use your data, or would like us to remove your data from our records,
      please <a href="mailto:hello@stateofjs.com">get in touch</a>.
    </p>
  </div>
);

registerComponent('AccountPage', AccountPage, withCurrentUser);

export default AccountPage;
