/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const gulp = require('gulp');

/**
 * Should Apply uglify and minification
 */

function moveMainFile() {
    
    return gulp.src("./src/main.js")
        .pipe(gulp.dest("./dev"));
};


exports._LsResources = {
    _mainFile: moveMainFile,
}