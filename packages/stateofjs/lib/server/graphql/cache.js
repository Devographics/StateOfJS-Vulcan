import {
  addGraphQLResolvers,
  addGraphQLMutation,
  addGraphQLQuery,
  nodeCache,
} from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

/*

Cache

*/
const clearCache = (root, args, { currentUser }) => {
  if (!Users.isAdmin(currentUser)) {
    throw new Error('You cannot perform this operation');
  }
  nodeCache.flushAll();
  return nodeCache.getStats();
};

addGraphQLMutation('clearCache: JSON');
addGraphQLResolvers({ Mutation: { clearCache } });

const cacheStats = (root, args, { currentUser }) => {
  if (!Users.isAdmin(currentUser)) {
    throw new Error('You cannot perform this operation');
  }
  return { keys: nodeCache.keys(), stats: nodeCache.getStats() };
};

addGraphQLQuery('cacheStats: JSON');
addGraphQLResolvers({ Query: { cacheStats } });



