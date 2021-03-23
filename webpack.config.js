import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    'index': './frontend/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: /frontend/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      publicPath: '/dist',
      title: 'Okay Drawings',
    }),
  ],
};
