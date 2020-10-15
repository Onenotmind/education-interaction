const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConf = require('./webpack.base.config')
const NodeExternal = require('webpack-node-externals')
const mode = 'prod'

module.exports = merge(baseWebpackConf(mode), {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs',
    publicPath:'./'
  },
  devtool: 'source-map',
  mode: 'production',
  externals: [NodeExternal()]
})
