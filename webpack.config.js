var path = require("path");
module.exports = {
  entry: {
    main: path.join(__dirname, 'src', 'SelfWritingText.jsx')
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname)
  },
  mode: "development",
  watch: true,
  module: {
    rules: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "es2015",
            'stage-2',
            "react"
          ]
        }
      }
    }]
  }
}