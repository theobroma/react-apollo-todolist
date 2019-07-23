'use strict';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (function makeConfig() {
  const config = {};
  config.entry = __dirname + '/src/app/app.jsx';
  config.output = {
    path: `${__dirname}/dist`,
    filename: '[name].[hash].js',
  };
  config.resolve = {
    extensions: ['.js', '.jsx'],
  };

  config.devtool = 'eval-source-map';

  config.module = {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-0'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: 'file-loader',
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  };

  config.plugins = [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/public/index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/src/public',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ];

  config.devServer = {
    contentBase: `${__dirname}/dist`,
    open: true,
    overlay: true,
    stats: 'minimal',
  };
  console.log(config.devServer);
  return config;
})();
