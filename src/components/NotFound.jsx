import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/stylesheets/404.css';

const NotFound = () => (
  <div className="notfound">
    <img className="notfound-img" src="https://freefrontend.com/assets/img/html-css-404-page-templates/HTML-404-Typed-Message.gif" alt="404" />
    <Link to="/meetups" className="back-to-home">BACK HOME</Link>
  </div>
);

export default NotFound;
