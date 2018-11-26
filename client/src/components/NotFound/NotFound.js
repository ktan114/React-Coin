import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="NotFound">
      <h1 className="NotFound__Title">Oops! Page not found!</h1>
      <Link to="/" className="NotFound__Link">Go to homepage</Link>
    </div>
  );
};

export default NotFound;
