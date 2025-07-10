// src/services/EmailService.js
const ProviderA = require("../providers/ProviderA");
const ProviderB = require("../providers/ProviderB");
const RateLimiter = require("../utils/RateLimiter");
const CircuitBreaker = require("../utils/CircuitBreaker");
const Logger = require("../utils/Logger");

class EmailService {
  constructor() {
    this.providers = [ProviderA, ProviderB];
    this.sentEmailIds = new Set();
    this.statusMap = new Map();
    this.rateLimiter = new RateLimiter(5); // 5 requests/sec
    this.circuitBreakers = [new CircuitBreaker(), new CircuitBreaker()];
  }

  async sendEmail(email) {
    const id = email.id;
    if (this.sentEmailIds.has(id)) {
      Logger.log(`Duplicate email id ${id} ignored`);
      return { status: "duplicate" };
    }

    if (!this.rateLimiter.isAllowed()) {
      Logger.error("Rate limit exceeded");
      return { status: "rate-limit" };
    }

    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      const breaker = this.circuitBreakers[i];
      if (!breaker.canAttempt()) {
        Logger.error(`Provider ${i} is on cooldown`);
        continue;
      }

      try {
        const result = await this.retry(() => provider.sendEmail(email), 3);
        breaker.success();
        this.sentEmailIds.add(id);
        this.statusMap.set(id, { status: "sent", provider: result.provider });
        Logger.log(`Email sent via ${result.provider}`);
        return { status: "sent", provider: result.provider };
      } catch (e) {
        breaker.fail();
        Logger.error(`Provider ${i} failed:`, e.message);
      }
    }

    this.statusMap.set(id, { status: "failed" });
    return { status: "failed" };
  }

  async retry(fn, retries) {
    let delay = 100;
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch {
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      }
    }
    throw new Error("Retry failed");
  }

  getStatus(id) {
    return this.statusMap.get(id) || { status: "unknown" };
  }
}

module.exports = EmailService;
