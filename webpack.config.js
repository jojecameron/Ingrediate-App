const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  entry: './client/src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.module\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },

  devServer: {
    static: path.join(__dirname, 'dist'),
    open: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
