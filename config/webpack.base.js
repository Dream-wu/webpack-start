const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash].bundle.js'
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
      template: './src/index.html' 
    })
  ]
}