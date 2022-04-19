"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.uiServer = void 0;
// 插件库
const ui_server_1 = require("./lib/ui-server");
exports.uiServer = ui_server_1.default;
const server_1 = require("./lib/server");
exports.server = server_1.default;
