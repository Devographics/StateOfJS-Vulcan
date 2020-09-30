import React from 'react';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import ReactMarkdown from 'react-markdown';

const AccountMessage = (props, { intl }) => (
  <div className="message account-message">
    <h3><FormattedMessage id="general.why_create_account"/></h3>
    <ReactMarkdown source={intl.formatMessage({ id: 'general.create_account_reasons'})} escapeHtml={false} />
    {/* <p>
      We take your data seriously, and guarantee we will not pass it on to third parties.
    </p> */}
  </div>
);

AccountMessage.contextTypes = {
  intl: intlShape,
};

export default AccountMessage;
