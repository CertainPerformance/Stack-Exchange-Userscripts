const fs = require('fs');
const webpack = require('webpack');

module.exports = {
    entry: './build/index.js',
    output: {
        filename: 'StackThreeColumns.user.js',
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
