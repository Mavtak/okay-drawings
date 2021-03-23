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
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      publicPath: '/dist',
      title: 'Okay Drawings',
    }),
  ],
};
