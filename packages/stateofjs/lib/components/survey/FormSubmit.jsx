import React from 'react';
import { getResponsePath } from '../../modules/responses/helpers.js';
import { Components } from 'meteor/vulcan:core';

const FormSubmit = ({ submitForm, response, sectionNumber, nextSection, previousSection, history }) => (
  <div className="form-submit form-section-nav">
    <div className="form-submit-actions">
      {previousSection ? (
        <Components.Button
          type="submit"
          variant="primary"
          onClick={e => {
            e.preventDefault();
            submitForm();
            history.push(getResponsePath(response, sectionNumber - 1));
          }}
        >
          Previous: {previousSection.title}
        </Components.Button>
      ) : (
        <div />
      )}
      {nextSection ? (
        <Components.Button
          type="submit"
          variant="primary"
          onClick={e => {
            e.preventDefault();
            submitForm();
            history.push(getResponsePath(response, sectionNumber + 1));
          }}
        >
          Next: {nextSection.title}
        </Components.Button>
      ) : (
        <Components.Button
          type="submit"
          variant="primary"
          onClick={e => {
            e.preventDefault();
            submitForm();
            history.push('/thanks');
          }}
        >
          Finish Survey
        </Components.Button>
      )}
    </div>

    <div className="form-submit-help">Your data is saved whenever you navigate to the previous or next section.</div>
  </div>
);

export default FormSubmit;
