import React from 'react';
import { Link } from 'react-router-dom';

const Footer =  () => (
  <footer className="footer">
    &copy; 2019 <a href="http://stateofjs.com/">State of JavaScript</a>. <Link to="/privacy-policy">Privacy Policy</Link>. Questions? Found a bug? <a href="https://github.com/StateOfJS/StateOfJS-Vulcan/issues">Leave an issue</a>
  </footer>
);

export default Footer;
