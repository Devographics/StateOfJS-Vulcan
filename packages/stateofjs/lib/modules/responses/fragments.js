
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
    userId
    
    survey {
      name
      year
      status
      slug
      prettySlug
    }
  }
`);

registerFragment(/* GraphQL */ `
  fragment ResponseFragmentWithRanking on Response {
    ...ResponseFragment
    knowledgeRanking
  }
`);

registerFragment(/* GraphQL */ `
  fragment ResponseAdminFragment on Response {

    ...ResponseFragment

    completion

    normalizedResponse

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
