const path = require('path');
//const DeclarationBundlerPlugin = require('./declaration-bundler-webpack-plugin.fix');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
//const DtsBundleWebpack = require('dts-bundle-webpack');
const fs = require('fs');


const umdConfig = {
    mode: 'development',
    devtool: 'source-map',
    //devtool: 'none',
    entry: './src/ThreadWorker.ts',
    externals: {
        '@tuval/core': 'tuval$core',
        '@tuval/cg': 'tuval$core$graphics',
        '@tuval/graphics': 'tuval$graphics',
        '@tuval/gui': 'tuval$gui',
        '@tuval/forms': 'tuval$forms',
        '@tuval/components/buttons': 'tuval$components$buttons',
        '@tuval/components/calendars': 'tuval$components$calendars',
        '@tuval/components/charts': 'tuval$components$charts',
        '@tuval/components/compression': 'tuval$components$compression',
        '@tuval/components/core': 'tuval$components$core',
        '@tuval/components/data': 'tuval$components$data',
        '@tuval/components/diagram': 'tuval$components$diagram',
        '@tuval/components/dropdowns': 'tuval$components$dropdowns',
        '@tuval/components/excelexport': 'tuval$components$excelexport',
        '@tuval/components/filemanager': 'tuval$components$filemanager',
        '@tuval/components/fileutils': 'tuval$components$fileutils',
        '@tuval/components/grids': 'tuval$components$grids',
        '@tuval/components/inputs': 'tuval$components$inputs',
        '@tuval/components/layouts': 'tuval$components$layouts',
        '@tuval/components/lists': 'tuval$components$lists',
        '@tuval/components/navigations': 'tuval$components$navigations',
        '@tuval/components/pdfexport': 'tuval$components$pdfexport',
        '@tuval/components/popups': 'tuval$components$popups',
        '@tuval/components/splitbuttons': 'tuval$components$splitbuttons',
        '@tuval/components/svgbase': 'tuval$components$svgbase',
        '@tuval/components/query-builder': 'tuval$components$query-builder',
        '@tuval/components/spreadsheet': 'tuval$components$spreadsheet'
    },
    module: {
        rules: [
            /*   {
                test: /\.js$/,
                use: ['babel-loader', 'webpack-conditional-loader']
              }, */
            {
                test: /\.(wasm|eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                type: 'javascript/auto',
                loader: 'arraybuffer-loader',
            },
            {
                test: /\.tsx?$/,
                //use: 'ts-loader',
                use: [
                    { loader: "ts-loader" },
                    //  { loader: "ifdef-loader", options: opts }
                ],
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
            /*  {
               test: /\.(woff|woff2|eot|ttf|otf)$/,
               use: [
                 'file-loader'
               ]
             } */
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            child_process: false,
            fs: false,
            crypto: false,
            net: false,
            tls: false,
            ws: false,
            os: false,
            path: false
        }
    },
    output: {
        libraryTarget: 'umd',
        filename: 'index-wp.js',
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'self'
    },
    plugins: []
};

module.exports = [umdConfig /* webClientConfig */ /* umdConfig */ /* , umdWebProcess */ ];