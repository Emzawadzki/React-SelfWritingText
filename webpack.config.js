var path = require("path");
module.exports = {
  entry: {
    main: path.join(__dirname, 'example', 'example.jsx')
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, 'example')
  },
  mode: "development",
  watch: true,
  module: {
    rules: [
      {
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
        },
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      },
    ]
  }
}