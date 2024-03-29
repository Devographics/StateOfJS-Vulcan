import {
  addGraphQLResolvers,
  addGraphQLMutation,
  addGraphQLQuery,
} from 'meteor/vulcan:core';
import get from 'lodash/get';
import Responses from '../../modules/responses/collection.js';
import NormalizedResponses from '../../modules/normalized_responses/collection.js';
import { normalizeResponse } from '../normalization/normalize';
import Users from 'meteor/vulcan:users';

/*

Normalization

*/
const normalizeIds = async (root, args, { currentUser }) => {
  if (!Users.isAdmin(currentUser)) {
    throw new Error('You cannot perform this operation');
  }
  const results = [];
  const { ids } = args;
  const responses = Responses.find({ _id: { $in: ids } }).fetch();
  for (const document of responses) {
    const { _id } = document;
    const normalization = await normalizeResponse({ document, verbose: true });
    const { result, normalizedFields } = normalization;
    results.push({ normalizedId: result._id, _id, normalizedFields });
  }
  return results;
};

addGraphQLMutation('normalizeIds(ids: [String]): [JSON]');
addGraphQLResolvers({ Mutation: { normalizeIds } });

/*

Normalization Debugging

*/
const surveyNormalization = async (root, { surveySlug, fieldName }) => {
  const [initialSegment, sectionSegment, fieldSegment, ...restOfPath] =
    fieldName.split('__');
  let rawFieldPath = `${sectionSegment}.${fieldSegment}.others.raw`;
  let normalizedFieldPath = `${sectionSegment}.${fieldSegment}.others.normalized`;
  if (fieldSegment === 'source') {
    // treat source field differently because it doesn't have "others"
    rawFieldPath = 'user_info.source.raw';
    normalizedFieldPath = 'user_info.source.normalized';
  }
  const query = {
    surveySlug,
    [rawFieldPath]: { $exists: true },
    $or: [
      { [normalizedFieldPath]: [] },
      { [normalizedFieldPath]: { $exists: false } },
    ],
  };
  const responses = NormalizedResponses.find(query, {
    fields: { _id: 1, responseId: 1, [rawFieldPath]: 1 },
  }).fetch();
  const cleanResponses = responses.map((r) => ({
    _id: r._id,
    responseId: r.responseId,
    value: get(r, rawFieldPath),
  }));
  return cleanResponses;
};

addGraphQLQuery(
  'surveyNormalization(surveySlug: String, fieldName: String): [JSON]'
);
addGraphQLResolvers({ Query: { surveyNormalization } });
