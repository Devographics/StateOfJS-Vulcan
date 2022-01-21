import {
  addGraphQLResolvers,
  addGraphQLMutation,
  addGraphQLQuery,
} from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import NormalizedResponses from '../../modules/normalized_responses/collection';
import Responses from '../../modules/responses/collection';
import { encrypt } from '../normalization/helpers';
import set from 'lodash/set';
import isEmpty from 'lodash/isEmpty';

// redact a couple values
const cleanData = (data) => {
  set(data, 'userAccountData.services.password.bcrypt', 'redacted');
  set(data, 'userAccountData.services.password.reset.token', 'redacted');
  set(data, 'userAccountData.services.resume.loginTokens', 'redacted');
  return data;
};

const _readme = `
This data includes the following fields (* means public data):
---
[email] The email used for the lookup.
---
[userAccountData] Data used by the accounts system for authentication purposes.
---
[rawResponses] "Raw" responses as received by our survey app.
---
[normalizedResponses*] Processed, normalized, and anonymized responses used to populate the survey results and 
made available through public datasets. Note that this can include responses imported from 
other sources not present in rawResponses.
---
[isPurged] Whether the above data has been purged from our system.
`;

const getAndPurgeUserData = async (email, shouldPurge = false) => {
  const encryptedEmail = encrypt(email);
  const userAccountData = Users.findOne({ email });
  const rawResponses = Responses.find({ email }).fetch();
  const normalizedResponses = NormalizedResponses.find({
    'user_info.hash': encryptedEmail,
  }).fetch();

  if (
    isEmpty(userAccountData) &&
    isEmpty(rawResponses) &&
    isEmpty(normalizedResponses)
  ) {
    throw Error(`No data found for email ${email}`);
  }
  const data = cleanData({
    _readme,
    email,
    userAccountData,
    rawResponses,
    normalizedResponses,
    isPurged: shouldPurge,
  });

  if (shouldPurge) {
    const usersRemoved = Users.remove({ email });
    const responsesRemoved = Responses.remove({ email });
    const normalizedResponsesRemoved = NormalizedResponses.remove({
      'user_info.hash': encryptedEmail,
    });
    data.purged = {
      usersRemoved,
      responsesRemoved,
      normalizedResponsesRemoved,
    };
  }

  return data;
};

const getUserData = async (root, { email }, { currentUser }) => {
  if (!Users.isAdmin(currentUser)) {
    throw new Error('You cannot perform this operation');
  }
  const userData = await getAndPurgeUserData(email, false);
  return userData;
};

addGraphQLMutation('getUserData(email: String!): JSON');
addGraphQLResolvers({ Mutation: { getUserData } });

const purgeUserData = async (root, { email }, { currentUser }) => {
  if (!Users.isAdmin(currentUser)) {
    throw new Error('You cannot perform this operation');
  }
  const userData = await getAndPurgeUserData(email, true);
  return userData;
};

addGraphQLMutation('purgeUserData(email: String!): JSON');
addGraphQLResolvers({ Mutation: { purgeUserData } });
