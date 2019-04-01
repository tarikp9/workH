import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";

class Table extends Component {
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
    return this.state.works.map((object, i) => {
      return (
        <TableRow
          obj={object}
          key={i}
          indice={i}
          delete={ind => this.deleteItem(ind)}
        />
      );
    });
  }

  deleteItem(index) {
    this.setState({ works: this.state.works.filter((_, i) => i !== index) });
  }

  onHome = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div>
        <div>
          <h5 align="center">Works</h5>
          <table className="table table-striped" >
            <thead>
              <tr>
                <th>Description</th>
                <th>Working hours</th>
                <th>On date</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>{this.tabRow()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
