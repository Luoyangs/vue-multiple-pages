const merge = require('webpack-merge')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = require('../config')
const baseConfig = require('./webpack.base.conf')
const posix = (filename) => path.posix.join('static', filename)

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, `../${config.build.assetsSubDirectory}`),
    filename: posix('js/[name].js')
    // chunkFilename: posix('js/[id].[chunkhash].js')
  },
  module: {
    rules: [
      {
        test: /\.(c|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
  optimization: {
    // 打包 公共文件
    splitChunks: {
      cacheGroups: {
        // node_modules内的依赖库
        vendor: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          minChunks: 2, // 被不同entry引用次数(import),1次的话没必要提取
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100
        },
        // merge all the css chunk to one file
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyjsWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin({
        cssProcessorOptions: {
          discardComments: { removeAll: true }
        },
        canPrint: true
      })
    ],
    // 用来提取 entry chunk 中的 runtime部分函数，形成一个单独的文件，这部分文件不经常变换，方便做缓存。
    runtimeChunk: true
  },
  plugins: [
    new CleanWebpackPlugin([config.build.assetsSubDirectory], {
      root: path.join(__dirname, '..'),
      verbose: true
    }),
    new MiniCssExtractPlugin({
      filename: posix('css/[name].css')
      // chunkFilename: posix('css/[id].[contenthash].css')
    })
  ]
})
