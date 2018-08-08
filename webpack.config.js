import HtmlWebPackPlugin from  'html-webpack-plugin';

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /^.((?!cssmodule).)*\.css$/,
                loaders: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /^.((?!cssmodule).)*\.scss$/,
                loaders: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ]
            },
        ]
    },
    plugins: [new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
    })]
};