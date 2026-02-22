const path = require('path')

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: './js/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  watch: true,
}