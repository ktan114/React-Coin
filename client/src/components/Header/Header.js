import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "./logo.png";
import Search from "../Search/Search";

const containerStyle = {
  fontSize: "40px"
};

const Header = () => {
  return (
    <div style={containerStyle} className="Header">
      <Link to="/">
        <img src={logo} alt="logo" className="Header__Logo" />
      </Link>
      <Search />
    </div>
  );
};

export default Header;
