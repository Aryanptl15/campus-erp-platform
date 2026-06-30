const express = require("express");
const router = express.Router();
const PayFees = require("../models/PayFees");

router.get("/", async (req, res) => {
  try {
    const payments = await PayFees.find();
    res.json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { studentName, enrollNo, branch, semester, amount, method, upiId, status } = req.body;

    if (!studentName || !enrollNo || !amount) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newPayment = new PayFees({
      studentName,
      enrollNo,
      branch,
      semester,
      amount,
      method,
      upiId,
      transactionId: "TXN" + Date.now()
    });

    await newPayment.save();
    console.log("Payment saved:", newPayment);

    res.json({ 
      success: true, 
      message: "Payment processed successfully",
      transactionId: newPayment.transactionId,
      data: newPayment
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ success: false, message: "Payment processing failed" });
  }
});

module.exports = router;
