const express = require("express");
const bodyParser = require("body-parser");
const EmailService = require("./src/services/EmailService");

const app = express();
const emailService = new EmailService();

// Middleware
app.use(bodyParser.json());

// POST /send route
app.post("/send", async (req, res) => {
  const { id, to, subject, body } = req.body;

  if (!id || !to || !subject || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const status = await emailService.sendEmail({ id, to, subject, body });
    res.status(200).json({ status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Use this for Render deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Email service running on port ${PORT}');
});