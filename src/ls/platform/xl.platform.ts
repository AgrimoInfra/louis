/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//common_modules
import "ls/common/IDispose/dispose";
import "ls/common/messageChannel/channelService";
import "ls/common/utils/utils";

//decorators
import "ls/common/decorators/decoratorServer";
import "ls/common/decorators/injector";
import "ls/common/decorators/serviceCollectionManager"

//services
import "ls/platform/services/environment/environmentService"

//runtime
import "ls/platform/runtime/runtime";

//window
import "ls/platform/window/window";
import "ls/platform/window/windowError";

//electron-main
import "ls/platform/electron-main/main"
