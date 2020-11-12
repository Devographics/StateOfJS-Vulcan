import crypto from 'crypto';
import { getSetting, runGraphQL, logToFile } from 'meteor/vulcan:core';
import get from 'lodash/get';
import intersection from 'lodash/intersection';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';

/*

Encrypt text

*/
const encryptionKey = process.env.ENCRYPTION_KEY || getSetting('encriptionKey');
export const encrypt = (text) => {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(encryptionKey),
    'stateofjsstateof'
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return encrypted.toString('hex');
};

/*

Clean up values to remove 'none', 'n/a', etc.

*/
export const ignoreValues = [
  ' ',
  '  ',
  '   ',
  '    ',
  '     ',
  '      ',
  '\n',
  '\n\n',
  '/',
  '\\',
  '*',
  '+',
  '-',
  '—',
  'n/a',
  'N/A',
  'NA',
  'None',
  'none',
  'no',
  'No',
  '.',
  '?',
];
export const cleanupValue = (value) =>
  ignoreValues.includes(value) ? null : value;

/*

Get entities

*/
const entitiesQuery = `query EntitiesQuery {
  entities{
    id
    category
    tags
    patterns
  }
}
`;

export const getEntities = async () => {
  try {
    return get(await runGraphQL(entitiesQuery), 'data.entities');
  } catch (error) {
    console.log('// getEntities error');
    console.log(error);
  }
};

/*

Extract matching tokens from a string

*/
const lowStringLimit = 150;
const highStringLimit = 190;
const extractTokens = async (rawString, rules) => {
  const stringLimit = rules.length > 50 ? lowStringLimit : highStringLimit;

  if (rawString.length > stringLimit) {
    await logToFile('normalization_errors.txt', rawString + '\n---\n');
    return [];
  }

  const tokens = [];
  let count = 0;
  // extract tokens for each rule, storing
  // the start/end index for each match
  // to be used later to detect overlap.
  for (const { pattern, id } of rules) {
    let scanCompleted = false;
    let scanStartIndex = 0;

    // add count to prevent infinite looping
    while (scanCompleted !== true && count < 400) {
      count++;
      const stringToScan = rawString.slice(scanStartIndex);
      const match = stringToScan.match(pattern);
      if (match !== null) {
        tokens.push({
          id,
          pattern: pattern.toString(),
          match: match[0],
          length: match[0].length,
          rules: rules.length,
          range: [
            scanStartIndex + match.index,
            scanStartIndex + match.index + match[0].length,
          ],
        });
        scanStartIndex += match.index + match[0].length;
      } else {
        scanCompleted = true;
      }
    }
  }

  // sort by length, longer tokens first
  tokens.sort((a, b) => b.length - a.length);

  // for each token look for smaller tokens contained
  // in its range and exclude them.
  const tokensToExclude = [];
  tokens.forEach((token, tokenIndex) => {
    // skip already excluded tokens
    if (tokensToExclude.includes(tokenIndex)) return;

    tokens.forEach((nestedToken, nestedTokenIndex) => {
      // ignore itself & already ignored tokens
      if (
        nestedTokenIndex === tokenIndex ||
        tokensToExclude.includes(nestedTokenIndex)
      )
        return;

      // is the nested token contained in the current token range
      if (
        nestedToken.range[0] >= token.range[0] &&
        nestedToken.range[1] <= token.range[1]
      ) {
        tokensToExclude.push(nestedTokenIndex);
      }
    });
  });

  const filteredTokens = tokens.filter(
    (token, index) => !tokensToExclude.includes(index)
  );

  const uniqueTokens = uniqBy(filteredTokens, (token) => token.id);
  const sortedTokens = sortBy(uniqueTokens, (token) => token.id);

  // ensure ids are uniques
  // const uniqueIds = [...new Set(filteredTokens.map((token) => token.id))];

  // alphabetical sort for consistency
  // uniqueIds.sort();

  return sortedTokens;
};

/*

Normalize a string value

(Can be limited by tags)

*/
export const normalize = async (value, allRules, tags) => {
  try {
    const rules = tags
      ? allRules.filter((r) => intersection(tags, r.tags).length > 0)
      : allRules;

    return await extractTokens(value, rules);
  } catch (error) {
    console.log('// normalize error');
    console.log(value);
    console.log(error);
  }
};

/*

Normalize a string value and only keep the first result

*/
export const normalizeSingle = async (value, allRules, matchCategories) => {
  const values = await normalize(value, allRules, matchCategories, false);
  return values[0];
};

/*

Handle source normalization separately since its value can come from 
three different fields (source field, referrer field, 'how did you hear' field)

*/
export const normalizeSource = async (r, allRules) => {
  try {
    const tags = ['sites', 'podcasts', 'youtube', 'sources'];

    const rawSource = get(r, 'user_info.source');
    const rawFindOut = get(
      r,
      'user_info.how_did_user_find_out_about_the_survey'
    );
    const rawRef = get(r, 'user_info.referrer');

    const normSource =
      rawSource && (await normalizeSingle(rawSource, allRules, tags));
    const normFindOut =
      rawFindOut && (await normalizeSingle(rawFindOut, allRules, tags));
    const normReferrer =
      rawRef && (await normalizeSingle(rawRef, allRules, tags));

    if (normSource) {
      return { ...normSource, raw: rawSource };
    } else if (normFindOut) {
      return { ...normFindOut, raw: rawFindOut };
    } else if (normReferrer) {
      return { ...normReferrer, raw: rawRef };
    } else {
      return;
    }
  } catch (error) {
    console.log('// normalizeSource error');
    console.log(error);
  }
};

/*

Generate normalization rules from entities

*/
export const generateEntityRules = (entities) => {
  const rules = [];
  entities.forEach((entity) => {
    const { id, patterns, tags } = entity;
    const separator = '( |-|_|.)*';

    // 1. replace "_" by separator
    const idPatternString = id.replaceAll('_', separator);
    const idPattern = new RegExp(idPatternString, 'i');
    rules.push({
      id,
      pattern: idPattern,
      tags,
    });

    // 2. replace "js" at the end by separator+js
    if (id.substr(-2) === 'js') {
      const patternString = id.substr(0, id.length - 2) + separator + 'js';
      const pattern = new RegExp(patternString, 'i');
      rules.push({ id, pattern, tags });
    }

    // 3. replace "css" at the end by separator+css
    if (id.substr(-3) === 'css') {
      const patternString = id.substr(0, id.length - 3) + separator + 'css';
      const pattern = new RegExp(patternString, 'i');
      rules.push({ id, pattern, tags });
    }

    // 4. add custom patterns
    patterns &&
      patterns.forEach((patternString) => {
        const pattern = new RegExp(patternString, 'i');
        rules.push({ id, pattern, tags });
      });
  });
  return rules;
};

export const logAllRules = async () => {
  const allEntities = await getEntities();
  let rules = generateEntityRules(allEntities);
  rules = rules.map(({ id, pattern, tags }) => ({
    id,
    pattern: pattern.toString(),
    tags,
  }));
  const json = JSON.stringify(rules, null, 2);

  await logToFile('rules.js', 'export default ' + json, {
    mode: 'overwrite',
  });
};
