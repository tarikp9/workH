import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .delete("http://localhost:3000/api/users/workhours/" + this.props.obj._id)

      .then(res => {
        console.log("deleted");
        this.props.delete(this.props.indice);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.description}</td>
        <td>{this.props.obj.hours}</td>
        <td>
          {" "}
          <Moment format="YYYY/MM/DD">{this.props.obj.onDatem}</Moment>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger btn-xs">
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
