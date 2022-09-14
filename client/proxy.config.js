module.exports = (serverLink) => ({
  "/api": {
    target: serverLink,
    logLevel: "debug",
    changeOrigin: true,
  },
  "/media": {
    target: serverLink,
    logLevel: "debug",
    changeOrigin: true,
  },
});
