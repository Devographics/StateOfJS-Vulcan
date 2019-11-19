import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';

const AdminResponses = () => (
  <div className="admin-responses">
    <Components.Datatable
      collectionName="Responses"
      options={{
        fragmentName: 'ResponseFragment'
      }}
      showNew={false}
      // columns={['name', 'slug']}
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
