import React from 'react';
import {Link} from "react-router-dom";

export default ({children}) => {
  return (
    <>
      <header className="navbar bg-primary text-white bg-gradient sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            <img height="40px" src="logo-white-no-bg.svg"/>
            <img alt="Endpoint Badge" className="version-badge"
                 src="https://img.shields.io/endpoint?url=https%3A%2F%2Fdoky-dev.azurewebsites.net%2Fversion"/>
          </Link>
        </div>
      </header>
      {children}
    </>
  );
}
