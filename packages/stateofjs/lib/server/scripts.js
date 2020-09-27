import Responses from '../modules/responses/collection';

export const surveyIdToSlug = async () => {
  // development
  Responses.update({surveyId: 'QRadnLi4FJnqxntnb'}, {$set: {surveySlug: 'js2019'}}, {multi: true})
  Responses.update({surveyId: 'fKBaReNz6JY9nP4Xj'}, {$set: {surveySlug: 'css2020'}}, {multi: true})
  // production
  Responses.update({surveyId: 'EvFFNQMH4h9kG2wmw'}, {$set: {surveySlug: 'js2019'}}, {multi: true})
}