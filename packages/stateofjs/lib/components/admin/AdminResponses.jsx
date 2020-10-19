import React from 'react';
import { Components } from 'meteor/vulcan:core';
import { getResponseData } from '../../modules/responses/helpers';

const ResponseData = ({ document }) => {
  return (
    <Components.ModalTrigger label="View Data" size="xl">
      <Components.Card document={getResponseData(document)} />
    </Components.ModalTrigger>
  );
};

const NormalizedData = ({ document }) => {
  return document.normalizedResponse ? (
    <Components.ModalTrigger label="View Normalized Data" size="xl">
      <Components.Card document={document.normalizedResponse} />
    </Components.ModalTrigger>
  ) : null;
};

const Completion = ({ document }) => <span>{document.completion}%</span>;

const AdminResponses = () => (
  <div className="admin-responses admin-content">
    <Components.Datatable
      collectionName="Responses"
      options={{
        fragmentName: 'ResponseAdminFragment',
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
