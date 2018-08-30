const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const util = require('./util')

module.exports = {
  target: 'web',
  entry: util.getEntries('./client/views/**/index.js'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.(vue|js)$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'static/images/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

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
