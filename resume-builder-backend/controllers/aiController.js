const OpenAI = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Resume improvement suggestions
const getSuggestions = async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) return res.status(400).json({ error: "Resume text is required" });

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert career coach." },
        { role: "user", content: `Here is a resume: ${resumeText}. Suggest improvements in bullet points.` }
      ],
      max_tokens: 250,
    });

    res.json({ suggestions: completion.choices[0].message.content });
  } catch (err) {
    console.error("AI Suggestion Error:", err.message);
    res.status(500).json({ error: "AI suggestion failed" });
  }
};

// Cover letter generator
const generateCoverLetter = async (req, res) => {
  try {
    const { resumeText, jobTitle, companyName } = req.body;
    if (!resumeText || !jobTitle || !companyName) {
      return res.status(400).json({ error: "Missing inputs" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional HR assistant." },
        { role: "user", content: `Here is the resume: ${resumeText}. Write a cover letter for ${jobTitle} at ${companyName}.` }
      ],
      max_tokens: 400,
    });

    res.json({ coverLetter: completion.choices[0].message.content });
  } catch (err) {
    console.error("Cover Letter Error:", err.message);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
};

// Job match analyzer
const matchJobDescription = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: "Missing inputs" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an ATS resume checker." },
        {
          role: "user",
          content: `Compare the resume and job description.
          Resume: ${resumeText}
          Job Description: ${jobDescription}

          Return:
          1. Match percentage
          2. Missing keywords
          3. Suggestions`,
        }
      ],
      max_tokens: 400,
    });

    res.json({ analysis: completion.choices[0].message.content });
  } catch (err) {
    console.error("Job Match Error:", err.message);
    res.status(500).json({ error: "Failed to analyze job description" });
  }
};

// ATS score
const atsScoreChecker = async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) return res.status(400).json({ error: "Missing resume text" });

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an ATS scoring system." },
        {
          role: "user",
          content: `Analyze the resume and provide:
          1. ATS score (0-100)
          2. Strengths
          3. Weaknesses
          4. Suggestions
          Resume: ${resumeText}`,
        }
      ],
      max_tokens: 400,
    });

    res.json({ atsReport: completion.choices[0].message.content });
  } catch (err) {
    console.error("ATS Score Error:", err.message);
    res.status(500).json({ error: "Failed to generate ATS score" });
  }
};

module.exports = {
  getSuggestions,
  generateCoverLetter,
  matchJobDescription,
  atsScoreChecker,
};
