const express = require("express");
const {
  getSuggestions,
  generateCoverLetter,
  matchJobDescription,
  atsScoreChecker,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/suggest", getSuggestions);
router.post("/cover-letter", generateCoverLetter);
router.post("/job-match", matchJobDescription);
router.post("/ats-score", atsScoreChecker);

module.exports = router;
