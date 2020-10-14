/*

1. Receive submitForm callback from SmartForm
2. Call it on click
3. Once form has submitted, redirect to prev/next section

TODO

- Refactor to make DRYer

*/
import React, { useState, useRef } from 'react';
import { getThanksPath } from '../../../modules/responses/helpers.js';
import { getSurveyPath } from '../../../modules/surveys/helpers.js';
import { Components } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { useHistory } from 'react-router-dom';


const FormSubmit = ({
  survey,
  submitForm,
  response,
  sectionNumber,
  nextSection,
  previousSection,
  showMessage = true,
  variant = 'bottom',
  readOnly,
}) => {
  const buttonRef = useRef();
  const history = useHistory();
  const [prevLoading, setPrevLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  return (
    <div className={`form-submit form-section-nav form-section-nav-${variant}`}>
      <div className="form-submit-actions">
        {nextSection ? (
          <Components.LoadingButton
            className="form-btn-next"
            loading={nextLoading}
            type="submit"
            variant="primary"
            inputRef={buttonRef}
            onClick={async (e) => {
              e.preventDefault();
              setNextLoading(true);
              await submitForm();
              setNextLoading(false);
              history.push(getSurveyPath({ survey, response, number: sectionNumber + 1 }));
            }}
          >
            <FormattedMessage id={`sections.${nextSection.id}.title`} /> »
          </Components.LoadingButton>
        ) : readOnly ? null : (
          <Components.LoadingButton
            className="form-btn-next form-btn-finish"
            loading={nextLoading}
            type="submit"
            variant="primary"
            onClick={async (e) => {
              e.preventDefault();
              setNextLoading(true);
              await submitForm();
              setNextLoading(false);
              history.push(getThanksPath(response));
            }}
          >
            <FormattedMessage id="general.finish_survey" />
          </Components.LoadingButton>
        )}
        {previousSection ? (
          <Components.LoadingButton
            className="form-btn-prev"
            loading={prevLoading}
            type="submit"
            variant="primary"
            onClick={async (e) => {
              e.preventDefault();
              setPrevLoading(true);
              await submitForm();
              setPrevLoading(false);
              history.push(getSurveyPath({ survey, response, number: sectionNumber - 1 }));
            }}
          >
            « <FormattedMessage id={`sections.${previousSection.id}.title`} />
          </Components.LoadingButton>
        ) : (
          <div className="prev-placeholder" />
        )}
      </div>

      {showMessage && (
        <div className="form-submit-help">
          <FormattedMessage id="general.data_is_saved" />
        </div>
      )}
    </div>
  );
};

export default FormSubmit;
