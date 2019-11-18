import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment SurveyFragment on Survey {
    _id
    createdAt
    updatedAt

    name
    year
    status

    user{
      _id
      displayName
      pagePath
    }
  }
`);


