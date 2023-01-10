const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  },
  devServer: {
    proxy: {
      // 配置跨域
      // http代理
      '/api': {
        // 后端访问对应的环境url
        target: 'http://localhost:8889',
        // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        changOrigin: true,//允许跨域
        //重写路径
        // pathRewrite: {
        //   '^/api': ''
        // }0
      },
    }
  }
})
