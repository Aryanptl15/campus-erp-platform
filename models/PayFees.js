const mongoose = require("mongoose");

const payFeesSchema = new mongoose.Schema({
  // Student Details
  studentName: {
    type: String,
    required: true
  },
  enrollNo: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  
  // Payment Details
  method: {
    type: String,
    required: true,
    enum: ['UPI', 'Card', 'Net Banking', 'Cheque']
  },
  transactionId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Paid",
    enum: ['Paid', 'Pending', 'Failed']
  },
  
  // UPI Payment Fields
  upiId: {
    type: String
  },
  
  // Card Payment Fields
  cardHolder: {
    type: String
  },
  cardNumber: {
    type: String // Stores only last 4 digits for security
  },
  
  // Net Banking Fields
  bankName: {
    type: String
  },
  
  // Cheque Payment Fields
  chequeNumber: {
    type: String
  },
  chequeBankName: {
    type: String
  },
  chequeDate: {
    type: Date
  },
  chequeHolder: {
    type: String
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PayFees", payFeesSchema);
