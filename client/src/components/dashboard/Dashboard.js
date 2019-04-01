import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import axios from "axios";
import TableRow from "../work/TableRow";
import Table from "../work/Table";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { works: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/api/users/all")
      .then(response => {
        this.setState({ works: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  tabRow() {
    return this.state.works.map(function(object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <div>
          <div className="row">
            <div className=" col center-align">
              <h4>
                <b>Hello </b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text">You are logged</p>
              </h4>
              <button onClick={this.onLogoutClick} className="btn btn-light">
                Logout
              </button>
            </div>
          </div>
          <div className="row">
            <Link to="/workhours" className="btn btn-info">
              Add Work Hours
            </Link>
            <div className="col s12 right-align">
              <Link to="/showtable" className="btn btn-info">
                Show Tabular Display
              </Link>
            </div>
          </div>
        </div>
        <Table />
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
