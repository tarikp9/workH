import React, { Component } from "react";
import TextFieldGroup from "../field/TextFieldGroup";
import TextAreaFieldGroup from "../field/TextAreaFieldGroup";
import { addHours } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AddHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      hours: "",
      onDate: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const Data = {
      description: this.state.description,
      hours: this.state.hours,
      onDate: this.state.onDate
    };
    this.props.addHours(Data, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="* Number of Hours"
            name="hours"
            value={this.state.hours}
            onChange={this.onChange}
            error={errors.hours}
          />
          <h6>On Date</h6>
          <TextFieldGroup
            name="onDate"
            type="date"
            value={this.state.onDate}
            onChange={this.onChange}
            error={errors.onDate}
          />

          <TextAreaFieldGroup
            placeholder="Work Description"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            info="Tell us something about your work"
            error={errors.description}
          />
          <input
            type="submit"
            value="Submit"
            className="btn btn-info btn-block mt-4"
          />
        </form>
      </div>
    );
  }
}

AddHours.propTypes = {
  addHours: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addHours }
)(withRouter(AddHours));
