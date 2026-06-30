const express = require("express");
const router = express.Router();
const Student = require("../models/student"); // lowercase s

// 🔥 TEST route (data add karva mate)
router.get("/add", async (req, res) => {
  const student = new Student({
    name: "Meet",
    branch: "Computer",
    fees: 50000
  });

  await student.save();
  res.send("Test data added");
});

// 📥 GET all students
router.get("/", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➕ ADD student (POST)
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;