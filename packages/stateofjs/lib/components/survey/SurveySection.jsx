/*

1. Look for responseId and section number in URL params
2. Load response from server using withSingle2 HoC
3. Display response form restricted to questions of current section via `fields` prop

Note: form has a customized "FormSubmit" component to show the prev/next buttons

TODO: 

- use hooks instead of withSingle2
- get rid of SurveySectionWithData and registerComponent

*/
import React from 'react';
import { Components, useSingle2 } from 'meteor/vulcan:core';
import { useParams, useHistory } from 'react-router-dom';
import surveys from '../../surveys';
import { getQuestionId } from '../../modules/responses/helpers.js';
import { statuses } from '../../modules/constants.js';
import SurveyNav from './SurveyNav.jsx';
import FormSubmit from './FormSubmit.jsx';
import FormLayout from './FormLayout.jsx';

const Section = ({ survey, sectionNumber, section, response, previousSection, nextSection, history }) => {
  const fields = section.questions.map(question => getQuestionId(survey, section, question));
  const { title, description } = section;
  return (
    <div className="section-questions">
      {response.survey && response.survey.status === statuses.closed && (
        <div className="survey-closed">
          This survey is now closed. You can review it but data can’t be submitted or modified.
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      <h3 className="section-description">{description}</h3>
      <Components.SmartForm
        documentId={response._id}
        fields={fields}
        collectionName="Responses"
        showDelete={false}
        queryFragmentName="ResponseFragment"
        mutationFragmentName="ResponseFragment"
        itemProperties={{
          layout: 'vertical',
        }}
        warnUnsavedChanges={true}
        disabled={response.survey.status === statuses.closed}
        Components={{
          FormLayout,
          FormSubmit: props => (
            <FormSubmit
              {...props}
              response={response}
              sectionNumber={sectionNumber}
              history={history}
              nextSection={nextSection}
              previousSection={previousSection}
            />
          ),
        }}
      />
    </div>
  );
};


const SurveySection = () => {
  const { responseId, sectionNumber = 0 } = useParams();
  const history = useHistory();

  const { document: response, loading } = useSingle2({
    collectionName: 'Responses',
    fragmentName: 'ResponseFragment',
    input: {id: responseId}
  });
  if (loading) {
    return <Components.Loading />;
  }
  const survey = surveys.find(s => s.slug === response.survey.slug)
  const surveyOutline = survey.outline
  const section = surveyOutline[sectionNumber];
  const previousSection = surveyOutline[sectionNumber - 1];
  const nextSection = surveyOutline[sectionNumber + 1];
  const sectionProps = {
    sectionNumber,
    section,
    response,
    previousSection,
    nextSection,
    history,
  };
  return (
    <div className="survey-section">
      <SurveyNav survey={response.survey} responseId={responseId} response={response} currentSectionNumber={sectionNumber} />
      <div className="section-contents">
        {loading ? (
          <Components.Loading />
        ) : !response ? (
          <p>Could not find survey.</p>
        ) : (
          <Section survey={survey} response={response} {...sectionProps} />
        )}
      </div>
    </div>
  );
};

export default SurveySection;
