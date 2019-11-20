import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';

const Thanks = () => (
  <div className="contents-narrow thanks">
    <p>Thanks for filling out the survey!</p>
    <p>Your data is saved. You can review or modify it until the survey closes.</p>
    <p>
      <Link to="/">Back</Link>
    </p>
  </div>
);

registerComponent('Thanks', Thanks);

export default Thanks;
