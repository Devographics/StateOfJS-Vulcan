import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */ `
  fragment ResponseFragment on Response {
    _id
    createdAt
    updatedAt

    pagePath

    ...ResponsesDefaultFragment
    
    user {
      _id
      displayName
      pagePath
    }

    survey {
      _id
      name
      year
    }
  }
`);

registerFragment(/* GraphQL */ `
  fragment CreateResponseOutputFragment on ResponseMutationOutput {
    data {
      ...ResponseFragment
    }
  }
`);
