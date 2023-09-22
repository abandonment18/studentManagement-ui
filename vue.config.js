const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  devServer: {
    // 设置本地默认端口，选填
    port: 80,
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "学生管理系统";
      return args;
    });
  },
};
