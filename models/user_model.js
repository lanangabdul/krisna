const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    }
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model("Auth", user);

module.exports = User;