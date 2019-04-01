import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link to="/" className="btn col center btn-light">
            Home
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
