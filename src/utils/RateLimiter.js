// src/utils/RateLimiter.js
class RateLimiter {
  constructor(limit) {
    this.limit = limit;
    this.timestamps = [];
  }

  isAllowed() {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(ts => now - ts < 1000);
    if (this.timestamps.length < this.limit) {
      this.timestamps.push(now);
      return true;
    }
    return false;
  }
}

module.exports = RateLimiter;
