const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    instructor: {
      type: String,
      trim: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalFeedbacks: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CourseModel = model("course", courseSchema);

module.exports = { CourseModel };
