import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import rspack from '@rspack/core';
import webpack from 'webpack';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

const getBabelConfig = () => ({
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-typescript', {
      isTSX: true,
      allExtensions: true,
    }],
  ],
  'plugins': [
    '@vue/babel-plugin-jsx',
    ['@stylex-extend/babel-plugin', {
      transport: 'attrs',
    }],
    '@stylexjs/babel-plugin',
  ],
});

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index",
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    isRunningRspack ? (
      new rspack.DefinePlugin({
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
    ) : (
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
    )
  ],
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  experiments: {
    css: true,
  },
  module: {
    parser: {
      asset: {
        dataUrlCondition: {
          maxSize: 4 * 1024,
        },
      },
    },
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: getBabelConfig(),
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|webp|webm|mp4)$/i,
        type: 'asset',
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        type: 'javascript/auto',
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                parser: 'postcss-scss',
                plugins: {
                  '@stylexjs/postcss-plugin': {
                    include: ['src/**/*.{js,jsx,ts,tsx}'],
                    babelConfig: getBabelConfig(),
                  },
                  autoprefixer: {},
                },
              },
            },
          },
        ],
      },
      { test: /\.json$/, type: 'json' },
    ],
  },
};

export default config;
