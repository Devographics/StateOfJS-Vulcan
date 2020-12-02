import { Components, registerComponent, useLocaleData, getSetting } from 'meteor/vulcan:core';
import React from 'react';
import Footer from './Footer.jsx';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { getSurvey } from '../../modules/surveys/helpers.js';
import EntitiesContext from './EntitiesContext';
import DefaultLocaleContext from './DefaultLocaleContext';
import { KeydownContextProvider } from './KeydownContext';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import get from 'lodash/get';

const entitiesQuery = `query EntitiesQuery {
  entities{
    name
    id
    type
    category
    description
    tags
    mdn
  }
}
`;

const Layout = ({ children }) => {
  // do not load default locale for now since we are using fallbacks
  
  // const defaultLocaleId = getSetting('defaultLocaleId');
  // const defaultLocaleResult = useLocaleData({ locale: defaultLocaleId });
  // const defaultLocale = get(defaultLocaleResult, 'data.locale');
  
  // use stubbed version instead for now
  const defaultLocale = { id: 'en-US', strings: []}

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
    <DefaultLocaleContext.Provider value={{ defaultLocale }}>
      <KeydownContextProvider>
        <EntitiesContext.Provider value={{ entities: get(data, 'entities') }}>
          <div className="wrapper" id="wrapper">
            <style dangerouslySetInnerHTML={{ __html: style }} />
            <Header />
            <main className="main-contents">{children}</main>
            <Footer />
          </div>
        </EntitiesContext.Provider>
      </KeydownContextProvider>
    </DefaultLocaleContext.Provider>
  );
};

registerComponent('Layout', Layout);

export default Layout;
