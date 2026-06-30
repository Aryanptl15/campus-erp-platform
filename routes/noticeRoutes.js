const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

// GET
router.get("/", async (req, res) => {
  const data = await Notice.find().sort({ date: -1 });
  res.json(data);
});

// ADD
router.post("/", async (req, res) => {
  const notice = new Notice(req.body);
  await notice.save();
  res.json({ msg: "Notice added" });
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// UPDATE
router.put("/:id", async (req, res) => {
  await Notice.findByIdAndUpdate(req.params.id, req.body);
  res.json({ msg: "Updated" });
});

module.exports = router;