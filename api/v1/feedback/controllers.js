const { FeedbackModel } = require("../../../models/feedbackSchema");
const { CourseModel } = require("../../../models/courseSchema");
const { handleGenericAPIError } = require("../../../utils/controllerHelpers");
const mongoose = require("mongoose");

const submitFeedbackController = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;
    const studentId = req.user._id;

    // Check if student has already submitted feedback for this course
    const existingFeedback = await FeedbackModel.findOne({
      course: courseId,
      student: studentId,
    });

    if (existingFeedback) {
      return res.status(400).json({
        isSuccess: false,
        message: "You have already submitted feedback for this course",
      });
    }

    // Create feedback
    const newFeedback = await FeedbackModel.create({
      course: courseId,
      student: studentId,
      rating,
      comment,
    });

    // Update course average rating
    const stats = await FeedbackModel.aggregate([
      { $match: { course: newFeedback.course } },
      {
        $group: {
          _id: "$course",
          avgRating: { $avg: "$rating" },
          totalFeedbacks: { $sum: 1 },
        },
      },
    ]);

    if (stats.length > 0) {
      await CourseModel.findByIdAndUpdate(courseId, {
        averageRating: stats[0].avgRating,
        totalFeedbacks: stats[0].totalFeedbacks,
      });
    }

    res.status(201).json({
      isSuccess: true,
      message: "Feedback submitted successfully",
      data: { feedback: newFeedback },
    });
  } catch (err) {
    handleGenericAPIError("submitFeedbackController", req, res, err);
  }
};

const getFeedbackStatsController = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Convert string to ObjectId
    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const stats = await FeedbackModel.aggregate([
      // Changed from Feedback to FeedbackModel
      { $match: { course: courseObjectId } }, // Also changed courseId to course to match your schema
      {
        $group: {
          _id: "$course", // Changed from courseId to course
          avgRating: { $avg: "$rating" },
          totalFeedbacks: { $sum: 1 },
          ratingCounts: {
            $push: "$rating",
          },
        },
      },
    ]);

    if (!stats.length) {
      return res
        .status(404)
        .json({ message: "No feedback found for this course" });
    }

    // Transform ratingCounts into counts per rating value (1–5)
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    stats[0].ratingCounts.forEach((r) => {
      distribution[r] = (distribution[r] || 0) + 1;
    });

    res.status(200).json({
      avgRating: stats[0].avgRating,
      totalFeedbacks: stats[0].totalFeedbacks,
      ratingDistribution: distribution,
    });
  } catch (error) {
    console.error("❌ Error in getFeedbackStatsController ---------");
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFeedbacksByCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;

    const feedbacks = await FeedbackModel.find({ course: courseId })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      isSuccess: true,
      message: "Feedbacks retrieved successfully",
      data: { feedbacks },
    });
  } catch (error) {
    console.error("❌ Error in getFeedbacksByCourseController ---------");
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  submitFeedbackController,
  getFeedbackStatsController,
  getFeedbacksByCourseController,
};
