import { Components, registerComponent } from 'meteor/vulcan:lib';
import React from 'react';
import Footer from './Footer.jsx';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { getSurvey } from '../../modules/surveys/helpers.js';
import EntitiesContext from './EntitiesContext';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import get from 'lodash/get';

const entitiesQuery = `query EntitiesQuery {
  entities{
    name
    id
    type
    category
    context
    description
    tags
    mdn
  }
}
`;

const Layout = ({ children }) => {
  const { loading, data = {} } = useQuery(gql(entitiesQuery));

  const { slug, year } = useParams();
  let style = '';

  if (slug && year) {
    const survey = getSurvey(slug, year);
    if (survey) {
      const { bgColor, textColor, linkColor, hoverColor } = survey;
      style = `
:root {
  --bg-color: ${bgColor};
  --text-color: ${textColor};
  --link-color: ${linkColor};
  --hover-color: ${hoverColor};
}
  `;
    }
  }
  
  return loading ? (
    <Components.Loading />
  ) : (
    <EntitiesContext.Provider value={{ entities: get(data, 'entities') }}>
      <div className="wrapper" id="wrapper">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <Header />
        <main className="main-contents">{children}</main>
        <Footer />
      </div>
    </EntitiesContext.Provider>
  );
};

registerComponent('Layout', Layout);

export default Layout;
