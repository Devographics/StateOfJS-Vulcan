
import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */ `
  fragment SaveFragment on Save {
    _id
    createdAt
    startedAt
    finishedAt
    responseId
    duration
  }
`);

