const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    postedBy: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['education', 'egov', 'bfsi', 'health'],
      required: true
    }
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model("Event", eventSchema);
  