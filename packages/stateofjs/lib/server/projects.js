import Projects from '../modules/projects/collection.js';
import staticProjectsData from '../data/js/projects.js';
import fetch from 'node-fetch';

const replaceAll = function (target, search, replacement) {
  return target.replace(new RegExp(search, 'g'), replacement);
};

const formatId = (id) => id && replaceAll(id, '-', '_');

export const loadProjects = async () => {
  console.log('// Adding Best of JS projects to DB…');
  Projects.remove({});
  // const response = await fetch(
  //   'https://bestofjs-static-api.vercel.app/projects.json'
  // );
  // const BestOfJSData = await response.json();
  // const projectsData = BestOfJSData.projects;
  const projectsData = staticProjectsData;
  // format all ids (- to _)
  let data = projectsData.map((project) => {
    return { ...project, id: formatId(project.id) };
  });
  // TODO: filter out any project that is already in entities
  Projects.rawCollection().insertMany(data);
  console.log(`  -> Inserted ${projectsData.length} projects.`);
};
