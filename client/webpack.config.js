const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                // match any js or jsx files
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                // match any css files
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                // match any common image file formats
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images/',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
        }),
        new Dotenv({
            path: path.resolve(__dirname, '../.env'),
        }),
    ],
    // defining dev server attributes
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 3001,
        historyApiFallback: true,
    },
    mode: process.env.MODE || 'development',
};