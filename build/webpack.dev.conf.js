const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const util = require('./util')
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

const templates = util.getEntries('./client/views/**/index.html')
for (const name in templates) {
  // 配置生成的html文件，定义路径
  const config = {
    filename: name + '.html',
    template: templates[name],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    excludeChunks: Object.keys(templates).filter(item => item !== name)
  }

  module.exports.plugins.push(new HtmlWebpackPlugin(config))
}
