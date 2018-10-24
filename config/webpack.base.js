const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'script/[name].[hash:5].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      ['dist'], 
      {
        root: path.resolve(__dirname, '../'),   //根目录
        verbose: true,        　　　　　　　　　　//开启在控制台输出信息
      }
    ),
    new HtmlWebpackPlugin({ 
      filename: "index.html",
      template: "src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "style/[name].css",
      chunkFilename: "style/[id].css"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /.css$/,
          chunks: 'all',    // merge all the css chunk to one file
          enforce: true
        }
      }
    }
  }
}