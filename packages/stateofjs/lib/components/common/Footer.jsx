import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const Footer = () => (
  <footer className="footer">
    &copy; 2020 <a href="http://stateofjs.com/">State of JavaScript</a> |{' '}
    <Link to="/privacy-policy">
      <FormattedMessage id="general.privacy_policy" />
    </Link>{' '}
    | <FormattedMessage id="general.emoji_icons" html={true} /> |{' '}
    <FormattedMessage
      id="general.leave_issue"
      values={{ link: 'https://github.com/StateOfJS/StateOfJS-Vulcan/issues' }}
      html={true}
    />
  </footer>
);

export default Footer;
