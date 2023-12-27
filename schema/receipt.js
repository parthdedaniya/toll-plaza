const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  vehicleNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  isReturn: {
    type: Boolean,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
