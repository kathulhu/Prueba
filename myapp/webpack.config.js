const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./views/index.hbs",
    filename: "./index.hbs"
});

module.exports = {
    entry: "./client/index.js",
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "[name].js"
    },
    devServer: {
        watchOptions: {
            ignored: /node_modules/
        }
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [htmlPlugin],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader",
                options: { name: '/static/[name].[ext]' }
            }
        ]
    }
};