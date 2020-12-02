import React from 'react';
import { Components, useCurrentUser } from 'meteor/vulcan:core';

const AccountPage = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div className="contents-narrow account">
      {currentUser && (
        <p>
          <Components.FormattedMessage id="accounts.logged_in_as" values={{ email: currentUser.email }} />
        </p>
      )}
      <Components.AccountsLoginForm />
      <p>
        <Components.FormattedMessage id="accounts.questions" html={true} />
      </p>
    </div>
  );
};

export default AccountPage;