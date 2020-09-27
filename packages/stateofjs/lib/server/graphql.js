import { addGraphQLSchema } from "meteor/vulcan:core";

const surveyType = `type Survey {
  slug: String 
  name: String 
  year: Float 
  status: Float 
  imageUrl: String 
}`;

addGraphQLSchema(surveyType);
