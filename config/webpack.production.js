const path = require('path');
module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "scripts/[name].[hash:5].bundles.js",
    publicPath: "/"
  }
}