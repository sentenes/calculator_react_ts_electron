
const webpack = require("webpack")
const path = require("path");

module.exports = {
  entry: "./render/main/index",
  output: {
    filename: "[name].[hash].js",
    path: path.join(__dirname, "../dist-main"),
  },
  target: "electron-renderer",
  resolve: {
    // 引入的默认后缀名,一个个找
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      //   "@": path.resolve("src"), // 这样配置后 @ 可以指向 src 目录
    },
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: "ts-loader",
      exclude: / node_modules /,
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: ["style-loader", "css-loader"]
    },
    {
      test: /\.css$/,
      exclude: /node_modules\/\**/,
      use: [
        require.resolve("style-loader"),
        {
          loader: require.resolve("css-loader"),
          options: {
            modules: {
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
        }
      ],
    },
    {
      test: /\.(jpg|png|jpeg|gif)$/,
      loader: "url-loader"
    }],
  },
  plugins: [],
}

