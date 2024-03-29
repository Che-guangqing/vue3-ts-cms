// const { defineConfig } = require("@vue/cli-service");
// const path = require("path");

module.exports = {
  outputDir: "./build",
  publicPath: "./",
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
      },
    },
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:5000",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set("@", path.resolve(__dirname, "src"))
  //     .set("views", "@/views");
  //   // .set("components", "@/components");
  // },
};

// module.exports = defineConfig({
//   transpileDependencies: true,
// });
