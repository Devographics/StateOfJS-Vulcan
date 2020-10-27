
import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */ `
  fragment ProjectFragment on Project {
    _id
    id
    name
    npm
    github
    description
    homepage
  }
`);

