import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';

const AccountMessage = () => (
  <div className="message account-message">
    <h4>Why do I need to create an account?</h4>
    <p>We ask you to create an account in order to:</p>
    <ul>
      <li>Avoid duplicate responses</li>
      <li>Give you access to your data</li>
      <li>Save your session as you go</li>
      <li>Notify you when results are live</li>
    </ul>
    {/* <p>
      We take your data seriously, and guarantee we will not pass it on to third parties.
    </p> */}
  </div>
);

registerComponent('AccountMessage', AccountMessage);

export default AccountMessage;
