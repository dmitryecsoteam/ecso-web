const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = (env, argv) => {

  const devMode = argv.mode !== 'production';

  return ({
    entry: [ '@babel/polyfill', './src/app.js' ],
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.[hash].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.s?css$/,
          use: [
            //devMode ? 'style-loader': MiniCssExtractPlugin.loader,
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|svg)/,
          use: {
            loader: 'url-loader'
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin('public', {} ),
      new CopyPlugin([{
        from: 'images',
        to: 'images'
      }]),
      new MiniCssExtractPlugin({
        filename: "styles.[hash].css"
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: false,
        filename: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new Dotenv({
        path: `./env.${devMode ? "dev" : "prod"}`
      })
    ],
    devtool: devMode ? 'cheap-module-source-map' : 'cheap-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      publicPath: '/',
      open: true,
      hot: true,
      historyApiFallback: true,
      port: 8888
    }
  });
}