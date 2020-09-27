import { registerComponent } from 'meteor/vulcan:lib';
import React from 'react';
import Footer from './Footer.jsx'
import Header from './Header';

const Layout = ({ children }) => (
  <div className="wrapper" id="wrapper">
    <Header />
    <main className="main-contents">{children}</main>
    <Footer/>
  </div>
);

registerComponent('Layout', Layout);

export default Layout;
