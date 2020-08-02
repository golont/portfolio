const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const pub = path.resolve(__dirname, "./src", "public");
const app = path.resolve(__dirname, "./src", "app");
const ctx = path.resolve(__dirname, "./src");
const dist = path.resolve(__dirname, "./dist");
const paths = {
  ctx,
  dist,
  public: pub,
  app,
};

module.exports = {
  mode: isDev ? "development" : "production",
  resolve: {
    extensions: [".js"],
    alias: {
      "@": paths.ctx,
    },
  },
  entry: { app: ["@babel/polyfill", `${paths.app}`] },
  output: {
    filename: `assets/js/[name].[hash].js`,
    path: paths.dist,
    publicPath: "/",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: paths.dist,
    liveReload: true,
    overlay: true, //beautify error messages
    port: 8081,
    historyApiFallback: true,
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        { from: `${paths.public}/img`, to: "assets/img" },
        { from: `${paths.public}/fonts`, to: "assets/fonts" },  
        { from: `${paths.public}/static`, to: "" },
      ],
    }),
    new MiniCssExtractPlugin({ filename: "assets/css/[name].[hash].css" }),
    new HtmlWebpackPlugin({
      template: `${paths.public}/index.html`,
      filename: "./index.html",
    }),
  ],
};
