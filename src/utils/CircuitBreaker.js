// src/utils/CircuitBreaker.js
class CircuitBreaker {
  constructor(failureThreshold = 3, cooldownTime = 5000) {
    this.failureThreshold = failureThreshold;
    this.cooldownTime = cooldownTime;
    this.failureCount = 0;
    this.lastFailedTime = null;
  }

  canAttempt() {
    if (this.failureCount >= this.failureThreshold) {
      const now = Date.now();
      return now - this.lastFailedTime > this.cooldownTime;
    }
    return true;
  }

  success() {
    this.failureCount = 0;
  }

  fail() {
    this.failureCount++;
    this.lastFailedTime = Date.now();
  }
}

module.exports = CircuitBreaker;
