const path = require('path');

module.exports = {
	cache: false,
    mode: 'development',
    entry: './src/index.js',
    target: "web",
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
                    limit: 16384,
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.js', '.css']
    },
    performance: {
        hints: "warning",
        maxAssetSize: 4194304,
        maxEntrypointSize: 3145728,
        assetFilter: function(assetFileName){
            return assetFileName.endsWith('.css') || assetFileName.endsWith(".js");
        }
    },
    output: {
        filename: 'demo.js',
		chunkFilename: '[name].demo.js',
        path: path.resolve(__dirname, 'dist'),
    }
};