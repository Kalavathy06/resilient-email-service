// src/providers/ProviderB.js
module.exports = {
  sendEmail: async (email) => {
    if (Math.random() < 0.3) throw new Error("ProviderB failed");
    return { success: true, provider: "ProviderB" };
  },
};
