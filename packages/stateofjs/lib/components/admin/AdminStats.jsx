import React from 'react';
import { Components } from 'meteor/vulcan:core';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import get from 'lodash/get';

const statsQuery = `query StatsQuery {
  stats {
    contents
  }
}
`;

const AdminStats = () => {
  const { loading, data = {} } = useQuery(gql(statsQuery));

  if (loading) {
    return <Components.Loading />;
  }
  return (
    <div className="admin-stats">
      <Components.Card document={get(data, 'stats.contents')} />
    </div>
  );
};

export default AdminStats;
