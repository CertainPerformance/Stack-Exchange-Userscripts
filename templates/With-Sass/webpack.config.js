const fs = require('fs');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        filename: 'StackUserscriptName.user.js',
    },
    devtool: 'none',
    mode: 'development',
    plugins: [
        new webpack.BannerPlugin({
            banner: fs.readFileSync('./src/userscript-metadata-block.js', 'utf-8'),
            raw: true
        })
    ]
};
