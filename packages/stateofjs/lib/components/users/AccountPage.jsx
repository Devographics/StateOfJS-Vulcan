import React from 'react';
import { Components, useCurrentUser } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const AccountPage = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div className="contents-narrow account">
      {currentUser && (
        <p>
          <FormattedMessage id="accounts.logged_in_as" values={{ email: currentUser.email }} />
        </p>
      )}
      <Components.AccountsLoginForm />
      <p>
        <FormattedMessage id="accounts.questions" html={true} />
      </p>
    </div>
  );
};

export default AccountPage;