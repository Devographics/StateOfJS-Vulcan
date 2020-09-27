
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
      name
      year
      status
      slug
    }
  }
`);

registerFragment(/* GraphQL */ `
  fragment ResponseAdminFragment on Response {

    ...ResponseFragment

    referrer
    source
    completion

    user {
      _id
      displayName
      pagePath
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
