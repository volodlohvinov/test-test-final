const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx'",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[fullhash].js",
    clean: true,
    publicPath: "./",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[fullhash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "static", to: "static" }],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 8064,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
      },},
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["node_modules"],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};
