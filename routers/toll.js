const express = require("express");
const router = express.Router();
const multer = require("multer");
const receiptSchema = require("../schema/receipt");
const upload = multer();

const getNewReceipt = async (vehicleNumber, isReturn) => {
  try {
    const receipt = new receiptSchema({
      vehicleNumber,
      isReturn,
      amount: isReturn ? 200 : 100,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    });
    await receipt.save();
    if (isReturn) {
      return (
        "New receipt created for " +
        vehicleNumber +
        " with return trip valid for today"
      );
    } else {
      return "New receipt created for " + vehicleNumber;
    }
  } catch (err) {
    return "Error while generating new receipt:" + err;
  }
};

router.post("/vehiclepass", upload.any(), async (req, res) => {
  try {
    const vehicleNumber = req.body.vehicleNumber;
    const isReturn = JSON.parse(req.body.isReturn);
    const isReceipt = await receiptSchema
      .findOne({ vehicleNumber: vehicleNumber })
      .sort({ date: -1, time: -1 });

    let responseMsg;
    if (isReceipt && isReceipt.isReturn) {
      if (
        new Date().toLocaleDateString() === isReceipt.date &&
        new Date().toLocaleTimeString() > isReceipt.time
      ) {
        // update isReturn to false
        await receiptSchema.findByIdAndUpdate(isReceipt._id, {
          isReturn: false,
        });
        responseMsg = "Used return receipt for " + vehicleNumber;
      } else {
        //get a new receipt
        responseMsg = "Previous return ticket is expired\n";
        responseMsg += await getNewReceipt(vehicleNumber, isReturn);
      }
    } else {
      //get a new receipt
      responseMsg = await getNewReceipt(vehicleNumber, isReturn);
    }
    res.status(201).send({ message: responseMsg });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

module.exports = router;
