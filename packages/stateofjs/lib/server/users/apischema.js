import Responses from '../../modules/responses/collection.js';
import Users from 'meteor/vulcan:users';

export const apiSchema = {
  
  responses: {
    typeName: '[Response]',
      resolver: (user, args, context) => {
        const responses = Responses.find({
          userId: user._id,
        }).fetch();
        console.log(responses)
        const restrictedResponses = Users.restrictDocuments({
          user,
          collection: Responses,
          documents: responses,
        });
        console.log(restrictedResponses)

        return restrictedResponses;
      },
  },

};
