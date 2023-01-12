/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const { _LsResources } = require("./gulp.platformResources");
const { _lsRuntime } = require("./gulp.runtime");
const gulp = require('gulp');


gulp.task("move-platform-resources", gulp.parallel(_LsResources._mainFile));
gulp.task("move-runtime", _lsRuntime);