import crypto from 'crypto';
import { getSetting, runGraphQL, logToFile } from 'meteor/vulcan:core';
import get from 'lodash/get';
import intersection from 'lodash/intersection';

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

export const ignoreValues = [
  ' ',
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

export const normalize = async (value, tags, matchMultiple = true) => {
  const normalizedItems = [];

  try {
    const allEntities = await getEntities();
    const allRules = generateEntityRules(allEntities);
    const rules = tags
      ? allRules.filter((r) => intersection(tags, r.tags).length > 0)
      : allRules;

    if (!value) {
      return [];
    }
    for (let rule of rules) {
      const { id, pattern } = rule;
      if (value.match(pattern) !== null) {
        normalizedItems.push({
          value: id,
          pattern: pattern.toString(),
          raw: value,
        });
        if (!matchMultiple) {
          break;
        }
      }
    }
  } catch (error) {
    console.log('// normalize error');
    console.log(value);
    console.log(error);
  }
  return normalizedItems;
};

export const normalizeSingle = async (value, matchCategories) => {
  const values = await normalize(value, matchCategories, false);
  return values[0];
};

/*

Handle source normalization separately since its value can come from 
three different fields (source field, referrer field, 'how did you hear' field)

*/
export const normalizeSource = async (r) => {
  try {
    const tags = ['sites', 'podcasts', 'youtube', 'sources'];

    const rawSource = get(r, 'user_info.source');
    const rawFindOut = get(
      r,
      'user_info.how_did_user_find_out_about_the_survey'
    );
    const rawRef = get(r, 'user_info.referrer');

    const normSource = await normalizeSingle(rawSource, tags);
    const normFindOut = await normalizeSingle(rawFindOut, tags);
    const normReferrer = await normalizeSingle(rawRef, tags);

    if (normSource) {
      return normSource;
    } else if (normFindOut) {
      return normFindOut;
    } else if (normReferrer) {
      return normReferrer;
    } else {
      return;
    }
  } catch (error) {
    console.log('// normalizeSource error');
    console.log(error);
  }
};

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

  logToFile('rules.js', 'export default ' + json, {
    mode: 'overwrite',
  });
};
