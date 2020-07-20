'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = ({ liveDev = false } = {}) => {
    const cwd = process.cwd();
    const filename = `Stack${cwd.match(/[^/\\]+$/)[0].replace(/-/g, '')}${liveDev ? 'LiveDev' : ''}.user.js`;
    const webpackConfigObj = {
        entry: './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
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
        devtool: 'none', // Keep the generated .js readable; no eval shenanigans
        mode: 'development', // Never minify. Completely different from liveDev
        plugins: [
            new webpack.BannerPlugin({
                banner: (liveDev ? '// LIVE DEV\n\n' : '') + fs.readFileSync('./src/userscript-metadata-block.js', 'utf-8'),
                raw: true,
            }),
            {
                apply: (compiler) => {
                    if (liveDev) {
                        return;
                    }
                    compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
                        const distTextContent = fs.readFileSync('./dist/StackThreeColumns.user.js', 'utf-8');
                        // Only change the metadata block:
                        fs.writeFileSync('./dist/StackThreeColumnsAdjustable.user.js', distTextContent.replace('Three Columns', 'Three Columns Adjustable'));
                    });
                },
            },
        ],
        stats: liveDev ? 'minimal' : 'normal',
    };
    if (liveDev) {
        webpackConfigObj.module.rules[0].options = {
            // When debugging/experimenting with live dev version, don't require type accuracy before compilation
            transpileOnly: true,
            compilerOptions: {
                outDir: './build',
                module: 'commonjs',
                target: 'es2017',
            },
        };
    }
    return webpackConfigObj;
};
