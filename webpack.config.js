const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new CopyPlugin([
      'src/index.html',
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),
  ]
};