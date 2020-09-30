import { registerComponent } from 'meteor/vulcan:lib';
import React from 'react';
import Footer from './Footer.jsx';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { getSurvey } from '../../modules/surveys/helpers.js';

const Layout = ({ children }) => {
  const { slug, year } = useParams();
  let style = '';

  if (slug && year) {
    const survey = getSurvey(slug, year);
    const { bgColor, textColor, linkColor } = survey;
    style = `


:root {
  --bg-color: ${bgColor};
  --text-color: ${textColor};
  --link-color: ${linkColor};
  --hover-color: ${linkColor};
}
  `;
  }

  return (
    <div className="wrapper" id="wrapper">
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <Header />
      <main className="main-contents">{children}</main>
      <Footer />
    </div>
  );
};

registerComponent('Layout', Layout);

export default Layout;
