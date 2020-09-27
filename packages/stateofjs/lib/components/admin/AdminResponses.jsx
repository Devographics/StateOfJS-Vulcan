import React from 'react';
import { Components } from 'meteor/vulcan:core';

const AdminResponses = () => (
  <div className="admin-responses">
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
        { name: 'completion', sortable: true, component: ({ document }) => <span>{document.completion}%</span> },
        // 'aboutyou_youremail',
        'referrer',
        // 'isSynced',
        'user',
      ]}
    />
  </div>
);

export default AdminResponses;
