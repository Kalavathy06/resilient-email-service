// src/utils/Logger.js
module.exports = {
  log: (...args) => console.log("[LOG]", ...args),
  error: (...args) => console.error("[ERROR]", ...args),
};
