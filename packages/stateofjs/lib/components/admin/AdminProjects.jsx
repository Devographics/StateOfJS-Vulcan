import React from 'react';
import { Components } from 'meteor/vulcan:core';
import Projects from '../../modules/projects/collection';

const AdminProjects = () => (
  <div className="admin-projects admin-content">
    <Components.Datatable
      collection={Projects}
      columns={['_id', 'id', 'name', 'description', 'github', 'npm', 'homepage']}
    />
  </div>
);

export default AdminProjects;
