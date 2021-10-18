import React, { useState } from 'react';
import { Components } from 'meteor/vulcan:core';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import get from 'lodash/get';
import surveys from '../../surveys';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';

const normalizationQuery = `query NormalizationQuery($surveySlug: String, $fieldName: String) {
  surveyNormalization(surveySlug: $surveySlug, fieldName: $fieldName)
}
`;

const getNormalizableFields = (survey) => {
  const allQuestions = survey.outline.map((o) => o.questions).flat();
  return allQuestions.filter((q) => q.template === 'others');
};

const AdminNormalization = () => {
  const location = useLocation();
  const history = useHistory();

  // parse query string
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { surveySlug, fieldId } = query;

  // set survey
  const defaultSurvey = surveySlug ? surveys.find((s) => s.slug === surveySlug) : surveys[0];
  const [survey, setSurvey] = useState(defaultSurvey);

  // get list of all normalizeable ("other") field for current survey
  const normalizeableFields = getNormalizableFields(survey);

  // set field
  const defaultField = fieldId ? normalizeableFields.find((f) => f.id === fieldId) : normalizeableFields[0];
  const [field, setField] = useState(defaultField);

  // run GraphQL query
  const { loading, data = {} } = useQuery(gql(normalizationQuery), {
    variables: { surveySlug: survey.slug, fieldName: field.fieldName },
  });

  if (loading) {
    return <Components.Loading />;
  }

  // console.log(surveys);
  // console.log(normalizeableFields);
  // console.log(data);

  const results = get(data, 'surveyNormalization');

  return (
    <div className="admin-normalization admin-content">
      <h3>
        {results.length} Missing Normalizations for{' '}
        <Components.Dropdown
          label={survey.slug}
          menuItems={surveys.map((survey) => ({
            label: survey.slug,
            onClick: () => {
              setSurvey(survey);

              // build search string to update the browser URL query string
              const search = qs.stringify({ surveySlug: survey.slug, fieldId: field.id });

              history.push({ search });
            },
          }))}
        />{' '}
        &gt;{' '}
        <Components.Dropdown
          label={field.id}
          menuItems={normalizeableFields.map((field) => ({
            label: field.id,
            onClick: () => {
              setField(field);

              // build search string to update the browser URL query string
              const search = qs.stringify({ surveySlug: survey.slug, fieldId: field.id });

              history.push({ search });
            },
          }))}
        />
      </h3>

      <ol>
        {results.map(({ _id, value }) => (
          <li key={_id}>
            {value} (<code>{_id}</code>)
          </li>
        ))}
      </ol>

      {/* <Components.Datatable data={[{ a: 1 }, { a: 2 }]} /> */}
    </div>
  );
};

export default AdminNormalization;
