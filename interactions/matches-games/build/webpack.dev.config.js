const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mode = 'dev'

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig(mode), {
  mode: 'development',
  devtool: config.dev.devtool,
  entry: {
    index: path.resolve('./test/index.ts')
  },
  devServer: {
    clientLogLevel: 'none',
    hot: true,
    contentBase: path.resolve(__dirname, '../src/'),
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    // 是否自动打开浏览器
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    // 是否启用代理服务器
    proxy: config.dev.proxyTable,
    watchContentBase: true,
    watchOptions: {
      poll: config.dev.poll,
      ignored: /node_modules/
    }
  },
  plugins: [
    // 热更新HMR插件(搭配 { hot: true } 使用))
    new webpack.HotModuleReplacementPlugin(),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin(),
    // 确保在遇到编译错误的时候不会退出进程
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'test/index.html',
      inject: true
    }),
    // 代码分割(webpack4.x废弃了commonChunks插件)
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    })
  ]
})

module.exports = devWebpackConfig
