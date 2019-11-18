import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';

const AdminSurveys = () => (
  <div className="admin-surveys">
    <Components.Datatable
      collectionName="Surveys"
      options={{
        fragmentName: 'SurveyFragment'
      }}
      // columns={['name', 'slug']}
    />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/',
  message: 'Sorry, you do not have the rights to access this page.',
};

registerComponent('AdminSurveys', AdminSurveys, [withAccess, accessOptions]);

export default AdminSurveys;
