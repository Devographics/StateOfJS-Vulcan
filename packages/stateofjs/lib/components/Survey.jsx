import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';

const Survey = () => (
  <div className="survey">
    Survey Page
  </div>
);

registerComponent('Survey', Survey);

export default Survey;
