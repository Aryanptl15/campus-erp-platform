const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require("../models/Admin");

// SIGNUP
router.post("/signup", async (req, res) => {
  const { secretKey, email, password } = req.body;

  if(secretKey !== "ADMIN_SCET"){
    return res.json({ msg: "Invalid Secret Key" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    email,
    password: hashedPassword
  });

  await admin.save();

  res.json({ msg: "Signup successful" });
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if(!admin){
    return res.json({ msg: "User not found" });
  }

  const match = await bcrypt.compare(password, admin.password);

  if(!match){
    return res.json({ msg: "Wrong password" });
  }

  res.json({ msg: "Login success" });
});

module.exports = router;