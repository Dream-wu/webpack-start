const path = require('path');
module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "scripts/[name].bundles.js"
  }
}