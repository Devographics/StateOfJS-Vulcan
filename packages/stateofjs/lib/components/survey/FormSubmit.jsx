/*

1. Receive submitForm callback from SmartForm
2. Call it on click
3. Once form has submitted, redirect to prev/next section

TODO

- Refactor to make DRYer

*/
import React, { useState } from 'react';
import { getResponsePath } from '../../modules/responses/helpers.js';
import { Components } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { useHistory } from 'react-router-dom';

const FormSubmit = ({
  submitForm,
  response,
  sectionNumber,
  nextSection,
  previousSection,
  showMessage = true,
  variant = 'bottom',
}) => {
  const history = useHistory();
  const [prevLoading, setPrevLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  return (
    <div className={`form-submit form-section-nav form-section-nav-${variant}`}>
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
            « <FormattedMessage id={`sections.${previousSection.id}.title`}/>
          </Components.LoadingButton>
        ) : (
          <div className="prev-placeholder"/>
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
            <FormattedMessage id={`sections.${nextSection.id}.title`}/>
             »
          </Components.LoadingButton>
        ) : (
          <Components.LoadingButton
            loading={nextLoading}
            type="submit"
            variant="primary"
            onClick={async e => {
              e.preventDefault();
              setNextLoading(true);
              await submitForm();
              setNextLoading(false);
              history.push('/thanks');
            }}
          >
            <FormattedMessage id="other.finish_survey"/> »
          </Components.LoadingButton>
        )}
      </div>

      {showMessage && (
        <div className="form-submit-help">
          Your data is saved whenever you navigate to the previous or next section.
        </div>
      )}
    </div>
  );
};

export default FormSubmit;
