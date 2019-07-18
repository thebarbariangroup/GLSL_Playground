const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: [
    './src/scripts/app.js',
    './src/index.html',
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../../dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use:  [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              name: 'main.css'
            }
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        loader: "file-loader",
        options: {
          name: '[name].[ext]'
        }
      },
      {
          test: /\.glsl$/,
          loader: 'webpack-glsl-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '../../dist'),
  }
};

    // './src/scripts/lib/opencv.js', 
