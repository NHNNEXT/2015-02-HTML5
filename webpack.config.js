module.exports = {
  entry: {
    "entry": "./entry.js"
  },
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [[
            "env", {
              targets: {
                browsers: ["last 2 versions"]
              }
            }
          ]]
        }
      }
    ]
  }
};