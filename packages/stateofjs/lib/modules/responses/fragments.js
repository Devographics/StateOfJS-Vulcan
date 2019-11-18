import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment ResponseFragment on Response {
    _id
    createdAt
    updatedAt

    ...ResponsesDefaultFragment

    user{
      _id
      displayName
      pagePath
    }

    survey{
      _id
      name
      year
    }
  }
`);


