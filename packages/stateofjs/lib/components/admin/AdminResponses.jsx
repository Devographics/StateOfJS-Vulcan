import React from 'react';
import { Components } from 'meteor/vulcan:core';
import { getResponseData } from '../../modules/responses/helpers';

const ResponseData = ({ document }) => {
  return (
    <Components.ModalTrigger label="Raw Data" size="xl">
      <Components.Card document={getResponseData(document)} />
    </Components.ModalTrigger>
  );
};

const NormalizedData = ({ document }) => {
  return document.normalizedResponse ? (
    <Components.ModalTrigger label="Norm. Data" size="xl">
      <Components.Card document={document.normalizedResponse} />
    </Components.ModalTrigger>
  ) : null;
};

const Completion = ({ document }) => <span>{document.completion}%</span>;

const AdminResponses = () => (
  <div className="admin-responses admin-content">
    <Components.Datatable
      collectionName="Responses"
      showDelete={true}
      options={{
        fragmentName: 'ResponseAdminFragment',
        pollInterval: 0,
      }}
      initialState={{
        sort: {
          updatedAt: 'desc',
        },
      }}
      // showNew={false}
      columns={[
        // '_id',
        { name: 'createdAt', sortable: true },
        { name: 'updatedAt', sortable: true },
        { name: 'completion', sortable: true, component: Completion },
        { name: 'surveySlug', label: 'Survey', filterable: true },
        // 'aboutyou_youremail',
        // 'isSynced',
        'user',
        { name: 'data', component: ResponseData },
        { name: 'normalizedData', component: NormalizedData },
      ]}
    />
  </div>
);

export default AdminResponses;
