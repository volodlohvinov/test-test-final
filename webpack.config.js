const path = require('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')



module.exports = {
    mode: 'none',
    entry: './src/index.jsx',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: './'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      new CopyPlugin({
        patterns: [
          {from: "static", to: "static",}
        ]
      }

      )
     
    ],
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                ],
                
              },
            },
          },
          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              
              {
                loader: "css-loader",
                options: {
                  esModule: true,
                  modules: {
                    namedExport: true,
                    localIdentName: "[name]__[local]",
                  },
                  
                  },
                },{
                  loader: 'sass-loader',
                  options: {
                  sassOptions: {
                    includePaths: ['node_modules'],
                  }
                }
              },
            ],
          },
          {
            test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
    
      optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin(),
        ],
      },
      devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        port: 8061,
        historyApiFallback: true,
        watchFiles: 'src/**/*',
        devMiddleware: {
          writeToDisk: true
        },
      },
      };