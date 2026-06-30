const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  branch:   { type: String, required: true },
  semester: { type: String, required: true },
  fees:     { type: Number, required: true, default: 61850 }
});

module.exports = mongoose.model("Student", studentSchema);