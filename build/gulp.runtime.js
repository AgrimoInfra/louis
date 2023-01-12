/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const gulp = require('gulp');

function moveRuntimeResources() {
    
    return gulp.src("./src/ls/sandbox/runtime/*.*").
        pipe(gulp.dest("./dev/ls/sandbox/runtime"))

}
exports._lsRuntime = moveRuntimeResources;