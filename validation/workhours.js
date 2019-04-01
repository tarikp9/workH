const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.hours = !isEmpty(data.hours) ? data.hours : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.onDate = !isEmpty(data.onDate) ? data.onDate : "";

  if (Validator.isEmpty(data.hours)) {
    errors.hours = "Number of hours field is required";
  } else if (!Validator.isInt(data.hours, { min: 1, max: 24 })) {
    errors.hours = "Only numbers between 1-24";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  } else if (!Validator.isLength(data.description, { min: 10, max: 90 })) {
    errors.description = "Description is too short!";
  }

  if (Validator.isEmpty(data.onDate)) {
    errors.onDate = "OnDate  field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
