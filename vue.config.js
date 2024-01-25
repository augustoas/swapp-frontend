const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"), // Alias '@' to point to the 'src' directory
      },
    },
  },
});
