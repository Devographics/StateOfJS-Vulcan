import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';
import ShareSite from './share/ShareSite.jsx';

const Thanks = () => (
  <div className="contents-narrow thanks">
    <p>Thanks for filling out the survey!</p>
    <p>Your data is saved. You can review or modify it until the survey closes.</p>
    <p>
      Also, you can help us get the word out by sharing this survey. Every bit counts, and it'll help make our data even
      more representative:
    </p>
    <ShareSite />
    <p>
      <Link to="/">Back</Link>
    </p>
  </div>
);

registerComponent('Thanks', Thanks);

export default Thanks;
