const { CourseModel } = require("../../../models/courseSchema");
const { handleGenericAPIError } = require("../../../utils/controllerHelpers");

// Create a new course
const createCourseController = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;

    const newCourse = await CourseModel.create({
      title,
      description,
      instructor,
    });

    res.status(201).json({
      isSuccess: true,
      message: "Course created successfully",
      data: { course: newCourse },
    });
  } catch (err) {
    handleGenericAPIError("createCourseController", req, res, err);
  }
};

// Get all courses
const getAllCoursesController = async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.status(200).json({
      isSuccess: true,
      message: "Courses fetched successfully",
      data: { courses },
    });
  } catch (err) {
    handleGenericAPIError("getAllCoursesController", req, res, err);
  }
};

// Get single course by ID
const getCourseByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findById(id);

    if (!course) {
      return res.status(404).json({
        isSuccess: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Course found",
      data: { course },
    });
  } catch (err) {
    handleGenericAPIError("getCourseByIdController", req, res, err);
  }
};

// Update course
const updateCourseController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await CourseModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({
        isSuccess: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Course updated successfully",
      data: { course: updatedCourse },
    });
  } catch (err) {
    handleGenericAPIError("updateCourseController", req, res, err);
  }
};

// Delete course
const deleteCourseController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await CourseModel.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({
        isSuccess: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    handleGenericAPIError("deleteCourseController", req, res, err);
  }
};

module.exports = {
  createCourseController,
  getAllCoursesController,
  getCourseByIdController,
  updateCourseController,
  deleteCourseController,
};
