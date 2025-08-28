const express = require("express");
const {
  submitFeedbackController,
  getFeedbackStatsController,
  getFeedbacksByCourseController,
} = require("./controllers");

const feedbackRouter = express.Router();

feedbackRouter.post("/", submitFeedbackController); // Submit feedback
feedbackRouter.get("/:courseId/stats", getFeedbackStatsController); // Analytics
feedbackRouter.get("/course/:courseId", getFeedbacksByCourseController);

module.exports = { feedbackRouter };
