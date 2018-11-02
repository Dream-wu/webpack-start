const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const os = require("os");
module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "scripts/[name].[hash:5].bundles.js",
    publicPath: "/"
  },
  optimization: {
    minimizer:[   // 利用多个CPU，多核压缩JS，JS不认识es的语法
      new UglifyJsPlugin({  // 代码少的时候不需要用多核压缩，效果反而差
        //parallel: true   // 开启多核,默认是当前核数-1
        parallel: os.cpus().length  
      })
    ]
  }
}