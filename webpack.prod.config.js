const path = require('path');
const DeclarationBundlerPlugin = require('./declaration-bundler-webpack-plugin.fix');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var libraryName = '@tuval/core';

function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', function() {
        var dts = require('dts-bundle');

        dts.bundle({
            name: libraryName,
            main: 'dist_types/types/index.d.ts',
            out: '../../dist/index.d.ts',
            removeSource: true,
            outputAsModuleFolder: true // to use npm in-package typings
        });
    });
};
const umdConfig = {
    entry: './src/tuval-core.ts',
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        libraryTarget: 'umd',
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new DtsBundlePlugin()
        /*  new DeclarationBundlerPlugin({
        moduleName: '"@tuval/core"',
        out: '../dist/index.d.ts',
        }) */
    ]
};

module.exports = [umdConfig /* webClientConfig */ ];