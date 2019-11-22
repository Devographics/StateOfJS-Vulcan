import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';

const AdminResponses = () => (
  <div className="admin-responses">
    <Components.Datatable
      collectionName="Responses"
      options={{
        fragmentName: 'ResponseAdminFragment'
      }}
      // showNew={false}
      columns={['_id', 'createdAt', 'updatedAt', 'aboutyou_youremail', 'isSynced', 'user']}
    />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/',
  message: 'Sorry, you do not have the rights to access this page.',
};

registerComponent('AdminResponses', AdminResponses, [withAccess, accessOptions]);

export default AdminResponses;
