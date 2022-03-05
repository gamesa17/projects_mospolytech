const path = require("path");
const dotenv = require("dotenv");
const getProxyConfig = require("./proxy.config");
const TerserPlugin = require("terser-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  try {
    const dotenvConfig = dotenv.config();

    if (dotenvConfig.error) {
      throw new Error(`Error while parsing .env config: ${dotenvConfig.error}`);
    }

    if (!process.env.CLIENT_PORT) {
      throw new Error(`.env file doesn't include CLIENT_PORT variable`);
    }

    if (!process.env.SERVER_PORT) {
      throw new Error(`.env file doesn't include SERVER_PORT variable`);
    }

    const mode = env.development ? "development" : env.production ? "production" : undefined;
    if (!mode) {
      throw new Error("Environment mode is undefined");
    }

    const isProduction = mode === "production";
    const isDevelopment = mode === "development";

    const productionPostfix = isProduction ? ".[contenthash]" : "";

    return {
      mode,

      entry: "./client/src/index",
      output: {
        filename: `[name].bundle${productionPostfix}.js`,
        chunkFilename: `[id].chunk${productionPostfix}.js`,
        path: path.resolve(__dirname, "client", "dist"),
      },

      resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
          "@ts": path.resolve(__dirname, "ts"),
          "@client": path.resolve(__dirname, "client", "src"),
          "@common": path.resolve(__dirname, "client", "src", "common"),
          "@localization": path.resolve(__dirname, "client", "src", "common", "localization"),
          "@components": path.resolve(__dirname, "client", "src", "components"),
          "@containers": path.resolve(__dirname, "client", "src", "containers"),
          "@icons": path.resolve(__dirname, "client", "src", "icons"),
        },
      },

      devtool: isDevelopment ? "source-map" : undefined,
      devServer: {
        port: process.env.CLIENT_PORT,
        hot: true,
        compress: true,
        client: {
          overlay: true,
          progress: true,
        },
        historyApiFallback: true,
        proxy: getProxyConfig(process.env.SERVER_PORT),
      },

      optimization: {
        minimize: isProduction,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            extractComments: false,
          }),
        ],
        splitChunks: {
          chunks: "all",
          automaticNameDelimiter: "-",
          maxInitialRequests: Infinity,
          cacheGroups: {
            vendors: {
              priority: 1,
              reuseExistingChunk: true,
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
            },
            default: false,
          },
        },
      },

      plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
          template: "./client/public/index.html",
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /[\\/]client[\\/]src[\\/]/,
            failOnError: true,
            allowAsyncCycles: false,
        }),
      ],

      module: {
        rules: [
          {
            test: /\.m?(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          },
        ],
      },
    };
  } catch (error) {
    console.log(`[WEBPACK ERROR]`, error);
    process.exit();
  }
};
