const express = require("express");
const {
  createCourseController,
  getAllCoursesController,
  getCourseByIdController,
  updateCourseController,
  deleteCourseController,
} = require("./controllers");

const coursesRouter = express.Router();

// CRUD routes
coursesRouter.post("/", createCourseController);
coursesRouter.get("/", getAllCoursesController);
coursesRouter.get("/:id", getCourseByIdController);
coursesRouter.put("/:id", updateCourseController);
coursesRouter.delete("/:id", deleteCourseController);

module.exports = { coursesRouter };
