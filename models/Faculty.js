const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: String,
  qualification: String,
  branch: String,
  salary: Number
});

module.exports = mongoose.model("Faculty", facultySchema);