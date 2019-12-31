'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = ({ liveDev = false } = {}) => {
    const cwd = process.cwd();
    const filename = `Stack${cwd.match(/[^/\\]+$/)[0].replace(/-/g, '')}${liveDev ? 'LiveDev' : ''}.user.js`;
    return {
        entry: './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.ts'],
        },
        output: {
            filename,
            path: path.join(cwd, liveDev ? '' : '/dist'),
        },
        devtool: 'none', // Keep the generated .js readable
        mode: 'development', // Never minify. Completely different from liveDev
        plugins: [
            // Only prepend the metadata block to the generated .js when the dist-ready .js is created
            // (With live dev, the local .js is being `@require`d by Tampermonkey, so the metadata block serves no purpose)
            !liveDev && new webpack.BannerPlugin({
                banner: fs.readFileSync('./src/userscript-metadata-block.js', 'utf-8'),
                raw: true,
            }),
        ].filter(Boolean),
        stats: liveDev ? 'minimal' : 'normal',
    };
};
