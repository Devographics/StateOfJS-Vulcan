import React from 'react';
import { Link } from 'react-router-dom';
import { Components } from 'meteor/vulcan:core';

const Footer = () => (
  <footer className="footer">
    &copy; 2021 <a href="https://stateofjs.com/">State of JavaScript</a> |{' '}
    <Link to="/privacy-policy">
      <Components.FormattedMessage id="general.privacy_policy" />
    </Link>{' '}
    | <Components.FormattedMessage id="general.emoji_icons" html={true} /> |{' '}
    <Components.FormattedMessage
      id="general.leave_issue"
      values={{ link: 'https://github.com/StateOfJS/StateOfJS-Vulcan/issues' }}
      html={true}
    />
  </footer>
);

export default Footer;