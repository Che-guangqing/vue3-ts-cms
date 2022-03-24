// const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = {
  outputDir: "./build",
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.resolve(__dirname, "src"))
      .set("views", "@/views");
  },
};

// module.exports = defineConfig({
//   transpileDependencies: true,
// });
