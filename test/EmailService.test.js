// test/EmailService.test.js
const EmailService = require("../src/services/EmailService.js");

test("Send and get status", async () => {
  const service = new EmailService();
  const email = { id: "123", to: "test@example.com", body: "Hello" };
  const result = await service.sendEmail(email);
  expect(["sent", "failed", "rate-limit", "duplicate"]).toContain(result.status);
  const status = service.getStatus("123");
  expect(status).toBeDefined();
});
