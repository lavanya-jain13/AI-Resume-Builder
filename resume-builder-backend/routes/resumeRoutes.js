const express = require("express");
const {
  createResume,
  getResumes,
  getResumeById,
} = require("../controllers/resumeController");

const router = express.Router();

router.post("/", createResume);     // save resume
router.get("/", getResumes);        // get all resumes
router.get("/:id", getResumeById);  // get resume by id

module.exports = router;
