

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';



const config = {
    entry: './src/view/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/view/index.html',
        }),

    ],
    module: {
        rules: [
            {
                test: /\.(js)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
            },
            {
                test: /\.(png|jpg|gif)$/i,
                loader: 'file-loader',
                options: {name: '[name].[ext]', outputPath: 'images/'},
                type : 'asset'
            },
            {
                test: /\.json$/,
                type: 'javascript/auto',
                use: 'json-loader'
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
