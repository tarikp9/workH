import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} >
        <div className="row">
          <div className="col s12 center-align">
            <div className="col s6">
              <Link
                to="/register"
                className="btn btn-indigo"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                className="btn btn-light-blue"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
