const path = require('path');

module.exports = {
	name: "tournamentTools",
	cache: false,
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
        maxAssetSize: 2097152,
        maxEntrypointSize: 3145728,
        assetFilter: function(assetFileName){
            return assetFileName.endsWith('.css') || assetFileName.endsWith(".js");
        }
    },
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
	},
    output: {
        filename: 'bundle.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
    }
};
