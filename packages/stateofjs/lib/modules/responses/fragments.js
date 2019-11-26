
import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */ `
  fragment ResponseFragment on Response {
    _id

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
  fragment ResponseAdminFragment on Response {
    _id
    createdAt
    updatedAt

    pagePath
    isSynced

    aboutyou_youremail
    referrer

    completion

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
