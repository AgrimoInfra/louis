/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check
const {resolve}  = require('path');



/**
 * Webpack Confirguration for PlatformBuildProcess
 * 
 * @type {import('webpack').Configuration}
 */

const sandboxWebpackConfiguration = {

    mode: 'development',
    target: "electron19-renderer",
    devtool: "inline-source-map",
    entry: {
        "xl.sandbox": resolve("./src/ls/_sandbox.ts")
    },
    resolve: {
        alias: {
            "ls": resolve("./src/ls"),
        },
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ]
    },
    output: {
        filename: "[name].js",
        path: resolve("./dev/ls/sandbox/runtime"),
        assetModuleFilename : "../runtime/resources/[contenthash][ext]"
    },
    

}

module.exports = sandboxWebpackConfiguration;