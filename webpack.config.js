const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.css$/i,
                loader: 'css-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.js', '.css']
    },
    output: {
        filename: 'tournament.bundle.js',
        path: path.resolve(__dirname, 'dist'),
    }
};
