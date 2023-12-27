const mongoose = require("mongoose");

mongoose
  .connect(process.env.ATLAS_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((e) => {
    console.log("Error while connecting database :", e);
  });
