import { Components, registerComponent } from 'meteor/vulcan:lib';
import React from 'react';
import Footer from './Footer.jsx'

const Layout = ({ children }) => (
  <div className="wrapper" id="wrapper">
    <Components.Header />
    <main className="main-contents">{children}</main>
    <Footer/>
  </div>
);

Layout.displayName = 'Layout';

registerComponent('Layout', Layout);

export default Layout;
