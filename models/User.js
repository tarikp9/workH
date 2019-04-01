const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  workhours: [
    {
      description: {
        type: String,
        required: true
      },
      hours: {
        type: Number,
        required: true
      },
      onDate: {
        type: Date,
        required: true
      }
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
