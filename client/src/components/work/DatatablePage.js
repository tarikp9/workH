import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import TableRow from "./TableRow";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class DatatablePage extends Component {
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

  tabRow() {
    return this.state.works.map(function(object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    let novi = this.state.works;
    let i = 1;
    let myArray = novi.filter(function(props) {
      props._id = i++;
      props.onDate = (
        <Moment format="YYYY/MM/DD">{props.onDate}</Moment>
      );
      return true;
    });

    const data = {
      columns: [
        {
          label: "Id",
          field: "_id",
          sort: "asc",
          width: 150
        },
        {
          label: "Description",
          field: "des",
          sort: "asc",
          width: 150
        },

        {
          label: "Hours",
          field: "hours",
          sort: "asc",
          width: 100
        },
        {
          label: "On Date",
          field: "onDate",
          sort: "asc",
          width: 150
        }
      ],
      rows: myArray
    };
    return (
      <div>
        {" "}
        <MDBDataTable striped bordered small data={data} btn={true} />
        <div className="row">
          <div className="col s12 center-align">
            <Link to="/dashboard" className="btn btn-info">
              Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default DatatablePage;
