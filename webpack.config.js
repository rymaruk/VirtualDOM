const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const outputPath = path.resolve(__dirname, '');

const indexFile = 'index.html';

const webpackConfig = {
    mode: 'production',
    entry: {
        app: [
            'babel-polyfill',
            path.resolve(__dirname, './src/app.js')

        ]
    },

    output: {
        path: path.resolve(__dirname, `${outputPath}/dist`),
        publicPath: "",
        filename: 'js/[name].[hash].js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    babelrc: true
                }
            },
            {
                test: /\.sass$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, `./src/${indexFile}`),
            filename: `./${indexFile}`,
            path: path.resolve(__dirname, '/dist')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        compress: false,
        port: 9000
      }

};

module.exports = webpackConfig;