const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  }

});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
