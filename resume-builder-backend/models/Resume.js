const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    linkedin: String,
    github: String,
  },
  education: [
    {
      degree: String,
      institution: String,
      year: String,
    },
  ],
  experience: [
    {
      title: String,
      company: String,
      duration: String,
      description: String,
    },
  ],
  skills: [String],
  projects: [
    {
      name: String,
      description: String,
      link: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Resume", ResumeSchema);
