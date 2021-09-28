const path = require('path');

module.exports = function (_env, argv) {
  return {
    mode: 'production',
    entry: './src/react_supervenn.jsx',
    output: {
      path: path.resolve(__dirname, 'react_supervenn'),
      filename: 'react_supervenn.js',
      library: 'react_supervenn',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              envName: 'production',
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false
                  }
                ],
                '@babel/preset-react'
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                'dynamic-import-webpack',
                'remove-webpack'
              ],
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.svg$/,
          resourceQuery: /svgr/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          resourceQuery: /url-loader/,
          use: {
            loader: 'url-loader',
          }
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
};