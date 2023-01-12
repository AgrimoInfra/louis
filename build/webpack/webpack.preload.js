/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/// <reference path="../../node_modules/@types/webpack/index.d.ts" />

//@ts-check

const { resolve } = require("path");


/**
 * Webpack Confirguration for PreloadProcess
 * 
 * @type {import('webpack').Configuration}
 */

const preloadWebpackConfiguration = {
    mode: 'development',
    target: "electron19-preload",
    devtool: "inline-source-map",
    entry: {
        "preload"  : resolve("./src/ls/platform/shared/preload.ts")
    },
    resolve: {
        extensions : [".ts",".js"],
    },
    amd : false,
    module : {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            }
        ]
    },
    output: {
        filename: "[name].js",
        path: resolve("./dev/ls/platform/preload")
    }

} 
module.exports = preloadWebpackConfiguration;