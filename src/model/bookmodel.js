const moment = require("moment");
const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
const bookSchema = new mongoose.Schema(
  {
    currentDay: {
      type: Date,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    night: {
      type: Number,
      required: true,
    },
    userId: {
      type: objectId,
      required: true,
      ref: "usermodel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("book", bookSchema);
