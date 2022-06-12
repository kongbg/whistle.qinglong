"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ql_1 = require("./ql");
function default_1(server, ctx) {
    // 监听request请求
    server.on('request', (req, res) => {
        const storage = ctx.storage;
        (0, ql_1.handle)(req, res, storage);
        return req.passThrough();
    });
}
exports.default = default_1;
