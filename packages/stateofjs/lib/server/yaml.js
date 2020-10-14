import yaml from 'js-yaml';
import { promises as fs } from 'fs';

const pathPrefix = '../../../../..';

const i18nCommon = `${pathPrefix}/packages/stateofjs/lib/i18n/common`;
const i18nCSS = `${pathPrefix}/packages/stateofjs/lib/i18n/state-of-css`;
const i18nJS = `${pathPrefix}/packages/stateofjs/lib/i18n/state-of-js`;
const surveyDirPath = `${pathPrefix}/packages/stateofjs/lib/surveys`;
const dataDirPath = `${pathPrefix}/packages/stateofjs/lib/data`;

export const convertYAMLDir = async dirPath => {

  const yamlPath = dirPath + '/yml';
  const jsPath = dirPath + '/js';
  const fileNames = await fs.readdir(yamlPath);
  for (const fileName of fileNames) {
    const yamlData = await fs.readFile(yamlPath + '/' + fileName, 'utf8');

    const json = yaml.safeLoad(yamlData, 'utf8');
    const jsonString = JSON.stringify(json, '', 2);
    const jsContents = `
/* Generated automatically, do not modify */
export default ${jsonString}
`
    await fs.writeFile(jsPath + '/' + fileName.replace('.yml', '.js'), jsContents, 'utf8');
  }
  
}

export const convertAllYAML = async () => {
  await convertYAMLDir(i18nCommon)
  await convertYAMLDir(i18nCSS)
  await convertYAMLDir(i18nJS)
  await convertYAMLDir(surveyDirPath)
  await convertYAMLDir(dataDirPath)
}