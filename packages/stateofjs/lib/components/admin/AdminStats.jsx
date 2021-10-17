import React from 'react';
import { Components } from 'meteor/vulcan:core';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import get from 'lodash/get';

const statsQuery = `query StatsQuery {
  stats {
    contents
  }
  cacheStats
}
`;

const AdminStats = () => {
  const { loading, data = {} } = useQuery(gql(statsQuery));
  if (loading) {
    return <Components.Loading />;
  }
  return (
    <div className="admin-stats admin-content">
      <div className="actions">
        <Components.MutationButton
          label="Renormalize Responses"
          mutationOptions={{
            name: 'normalizeIds',
            args: { ids: '[String]' },
          }}
          submitCallback={() => {
            const idsString = prompt('Enter comma-separated ids');
            const ids = idsString.split(',');
            return { mutationArguments: { ids } };
          }}
          successCallback={(result) => {
            console.log(result);
            alert('Responses normalized');
          }}
        />
      </div>
      <h3>Responses Stats</h3>
      <Components.Card document={get(data, 'stats.contents')} />
      <h3>
        <span>Cache Stats</span>
        <Components.MutationButton
          label="Clear Cache"
          mutationOptions={{
            name: 'clearCache',
          }}
          successCallback={() => {
            alert('Cache flushed');
          }}
        />
      </h3>
      <Components.Card document={get(data, 'cacheStats')} />
    </div>
  );
};

export default AdminStats;
