/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/// <reference path="../../node_modules/@types/webpack/index.d.ts" />

//@ts-check

const { resolve } = require("path");


/**
 * Webpack Confirguration for PlatformBuildProcess
 * 
 * @type {import('webpack').Configuration}
 */

const platformWebpackConfiguration = {
    mode: 'development',
    target: "electron19-main",
    devtool: "inline-source-map",
    entry: {
        "xl.platform"  : resolve("./src/ls/_platform.ts")
    },
    resolve: {
        alias: {
            "ls" : resolve("./src/ls")
        },
        extensions : [".ts",".js"],
    },
    module : {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    output: {
        filename: "[name].js",
        path: resolve("./dev/ls/platform")
    }

} 
module.exports = platformWebpackConfiguration;