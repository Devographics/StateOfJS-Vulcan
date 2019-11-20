import React, { useState } from 'react';
import { getResponsePath } from '../../modules/responses/helpers.js';
import { Components } from 'meteor/vulcan:core';

const FormSubmit = ({ submitForm, response, sectionNumber, nextSection, previousSection, history }) => {
  const [prevLoading, setPrevLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  return (
    <div className="form-submit form-section-nav">
      <div className="form-submit-actions">
        {previousSection ? (
          <Components.LoadingButton
            loading={prevLoading}
            type="submit"
            variant="primary"
            onClick={async e => {
              e.preventDefault();
              setPrevLoading(true);
              await submitForm();
              setPrevLoading(false);
              history.push(getResponsePath(response, sectionNumber - 1));
            }}
          >
            Previous: {previousSection.title}
          </Components.LoadingButton>
        ) : (
          <div />
        )}
        {nextSection ? (
          <Components.LoadingButton
          loading={nextLoading}
            type="submit"
            variant="primary"
            onClick={async e => {
              e.preventDefault();
              setNextLoading(true);
              await submitForm();
              setNextLoading(false);
              history.push(getResponsePath(response, sectionNumber + 1));
            }}
          >
            Next: {nextSection.title}
          </Components.LoadingButton>
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
};

export default FormSubmit;
