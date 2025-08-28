const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const feedbackSchema = new Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course", // relation to Course
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // relation to User (who gave feedback)
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Each student should give only 1 feedback per course (unique combination)
feedbackSchema.index({ course: 1, student: 1 }, { unique: true });

const FeedbackModel = model("feedback", feedbackSchema);

module.exports = { FeedbackModel };
