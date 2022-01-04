import Responses from '../../modules/responses/collection';
import { normalizeResponse } from './normalize';
// import take from 'lodash/take';

const limit = 800;

// every 10 min, normalize 200 unnormalized responses
export const normalizeJob = async ({ entities, rules }) => {
  const startAt = new Date();
  const unnormalizedResponses = Responses.find(
    { isNormalized: false },
    { limit }
  );
  const unnormalizedResponsesCount = unnormalizedResponses.count()

  const responsesToNormalizeCount = Math.min(
    unnormalizedResponsesCount,
    limit
  );

  if (unnormalizedResponses.length === 0) {
    // eslint-disable-next-line
    console.log('// 📊 Found 0 unnormalized responses.');
    return;
  }

  // eslint-disable-next-line
  console.log(
    `// 📊 Normalizing ${responsesToNormalizeCount}/${unnormalizedResponsesCount} unnormalized responses at ${startAt}…`
  );

  unnormalizedResponses.forEach(async (response) => {
    await normalizeResponse({ document: response, entities, rules });
  });

  const endAt = new Date();
  const diff = Math.abs(endAt - startAt);
  const duration = Math.ceil(diff / 1000);
  // eslint-disable-next-line
  console.log(
    `-> 📊 Done normalizing ${responsesToNormalizeCount} responses in ${duration}s`
  );
};
