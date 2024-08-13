const mongoose = require("mongoose");

const VaoidDetailsSchema = new mongoose.Schema(
  {
    UserId:{
        type:mongoose.ObjectId ,ref:'User',
    },
    VapidDetails:[]
  }
);

module.exports = mongoose.model("VaoidDetails", VaoidDetailsSchema);
