const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/constants": path.resolve(__dirname, "src/constants"),
    },
  },
};
