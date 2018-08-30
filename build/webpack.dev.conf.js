const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: '#eval-source-map',
  module: {
    rules: [
      {
        test: /\.(c|sc)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: [
                require('autoprefixer')()
              ]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    port: 8000,
    host: '0.0.0.0',
    hot: true,
    overlay: {
      errors: true,
      warnings: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
