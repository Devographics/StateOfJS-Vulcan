import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

const Home = () => (
  <div className="home">
    Home Page
    <Components.AccountsLoginForm />
  </div>
);

registerComponent('Home', Home);

export default Home;
