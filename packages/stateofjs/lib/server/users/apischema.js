import Responses from '../../modules/responses/collection.js';
import Users from 'meteor/vulcan:users';

export const apiSchema = {
  
  responses: {
    typeName: '[Response]',
      resolver: (user, args, context) => {
        const responses = Responses.find({
          userId: user._id,
        }).fetch();
        const restrictedResponses = Users.restrictDocuments({
          user,
          collection: Responses,
          documents: responses,
        });
        return restrictedResponses;
      },
  },

};
