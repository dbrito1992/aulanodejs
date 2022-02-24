const path = require('path'); // CommonJS

module.exports = {
  mode: 'development', // development = Desenvolvimento, prodution = Produção
  entry: './frontend/index.js', // aquivo principal
  output: {
    // Caminho do arquivo public
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  devtool: 'source-map'
};
