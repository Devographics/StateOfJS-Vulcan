
export const surveyIdToSlug = async () => {
  // development
  Responses.update(
    { surveyId: 'QRadnLi4FJnqxntnb' },
    { $set: { surveySlug: 'js2019' } },
    { multi: true }
  );
  Responses.update(
    { surveyId: 'fKBaReNz6JY9nP4Xj' },
    { $set: { surveySlug: 'css2020' } },
    { multi: true }
  );
  // production
  Responses.update(
    { surveyId: 'EvFFNQMH4h9kG2wmw' },
    { $set: { surveySlug: 'js2019' } },
    { multi: true }
  );
};


/*

Add a normalizedResponseId field to CSS2020 responses

*/
export const assignNormalizedResponseId = async () => {
  const count = Responses.find({
    surveySlug: 'css2020',
    normalizedResponseId: { $exists: false },
  }).count();

  console.log(
    `// Found ${count} responses with no normalizedResponseId field… (${new Date()})`
  );

  Responses.find(
    {
      surveySlug: 'css2020',
      normalizedResponseId: { $exists: false },
    },
    { sort: { createdAt: -1 } }
  ).forEach((response) => {
    const normResp = NormalizedResponses.findOne({ responseId: response._id });
    if (normResp) {
      Responses.update(
        { _id: response._id },
        { $set: { normalizedResponseId: normResp._id } }
      );
    }
  });
  console.log(`-> Done assigning normalizedResponseId field (${new Date()})`);
};


/*

Migrate opinions_other to opinions_others for consistency

*/
export const renameOpinionsOther = async () => {
  await renameFieldMigration(
    Responses,
    'css2020__opinions_other__currently_missing_from_css__others',
    'css2020__opinions_others__currently_missing_from_css__others'
  );
};


/*

Add a locale field to responses

*/
export const assignLocale = async () => {
  const responses = Responses.find(
    {
      surveySlug: 'css2020',
      locale: { $exists: false },
    },
    { sort: { createdAt: -1 } }
  );
  const count = responses.count();

  console.log(
    `// Found ${count} responses with no locale field… (${new Date()})`
  );

  responses.forEach((response) => {
    const user = Users.findOne({ _id: response.userId });
    if (user && user.locale) {
      Responses.update(
        { _id: response._id },
        { $set: { locale: user.locale } }
      );
    }
  });
  console.log(`-> Done assigning locale field (${new Date()})`);
};
