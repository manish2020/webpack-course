const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
var nodeExternals = require("webpack-node-externals")

module.exports = {
  name: "server",
  target: "node",
  externals: nodeExternals(),
  entry: "./src/server/render.js",
  output: {
    filename: "dev-server-bundle.js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "../build"),
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: {
          loader: "css-loader",
          options: {
            minimize: true
          }
        }
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/images/[name].[ext]",
              emitFile: false
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "markdown-with-front-matter-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new webpack.NamedModulesPlugin()
  ]
}
