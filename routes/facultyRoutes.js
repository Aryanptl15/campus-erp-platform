const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");

// GET
router.get("/", async (req, res) => {
  const data = await Faculty.find();
  res.json(data);
});

// ADD
router.post("/", async (req, res) => {
  const faculty = new Faculty(req.body);
  await faculty.save();
  res.json(faculty);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  res.json({ msg: "deleted" });
});

module.exports = router;