const path = require('path')
const BulkCopyWebpackPlugin = require('@peiyou/bulk-copy-webpack-plugin')
const config = require('./config')

module.exports = function (mode) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: /\.(ts)$/,
          use: ['babel-loader', 'ts-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    plugins: [
      new BulkCopyWebpackPlugin([{
        from: path.resolve(__dirname, '../node_modules/@peiyou'),
        to: path.join(config[mode].baseUrl, 'interaction-assets'),
        copyType: 'loop-filter',
        filter: 'interaction-assets',
      },
      {
        from: path.resolve(__dirname, '../node_modules/@peiyou/app-manager/libs'),
        to: path.join(config[mode].baseUrl, 'libs')
      }])
    ],
  }
}
