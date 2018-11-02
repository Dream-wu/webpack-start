const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _modeflag = (_mode == "production" ? true : false);
const webpackConfig = require(`./webpack.${_mode}.js`);
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const setTitle = require('node-bash-title');
// setTitle('wumj的苹果');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const loading = {
  html:'加载中'
}
webpackBase = {
  entry: {
    main: './src/index.js'
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
  devServer: {
    // port:3000,
    // hot:true,
    before(app) {
      app.get("/api/test",(req,res) => {
        res.json({
          code:200,
          message:"hello word"
        });
      })
    }
  },
  plugins: [
    new ProgressBarPlugin(),
    new WebpackBuildNotifierPlugin({
      title: "wumj Project Webpack Build",
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    }),
    new CleanWebpackPlugin(
      ['dist'], 
      {
        root: path.resolve(__dirname, '../'),   //根目录
        verbose: true,        　　　　　　　　　　//开启在控制台输出信息
      }
    ),
    new HtmlWebpackPlugin({ 
      filename: "index.html",
      template: "src/index.html",
      loading
    }),
    new MiniCssExtractPlugin({
      filename: _modeflag ? "styles/[name].[hash:5].css" : "styles/[name].css",
      chunkFilename: _modeflag ? "styles/[id].[hash:5].css" : "styles/[name].css"
    }),
    // new DashboardPlugin()
    new ManifestPlugin()
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
    },
    runtimeChunk: {
      name:"runtime"
    }
  }
}

module.exports = smp.wrap(merge(webpackBase, webpackConfig));