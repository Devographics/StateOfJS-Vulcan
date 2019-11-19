import { Components, registerComponent } from 'meteor/vulcan:lib';
import React from 'react';

const Layout = ({ children }) => (
  <div className="wrapper" id="wrapper">
    <Components.Header />
    <main className="main-contents">{children}</main>
  </div>
);

Layout.displayName = 'Layout';

registerComponent('Layout', Layout);

export default Layout;
