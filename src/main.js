/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const { app } = require("electron");

//Development environment

app.once("ready", () => {
  process.env.LS_DEV = "isDevelopment";

  require("./ls/platform/xl.platform");
});
