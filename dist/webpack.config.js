const path = require('path');

module.exports = {
        entry: './src/index.js',
        module: {
            rules: [
                {
                test: /\.css$/i,
                use:
                    [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
};
