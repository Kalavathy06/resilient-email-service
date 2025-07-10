// src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const EmailService = require("./services/EmailService");

const app = express();
const emailService = new EmailService();

app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const result = await emailService.sendEmail(req.body);
  res.json(result);
});

app.get("/status/:id", (req, res) => {
  const status = emailService.getStatus(req.params.id);
  res.json(status);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
});
