"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ql_1 = require("./ql");
function default_1(server, ctx) {
    // 监听request请求
    server.on('request', (req, res) => {
        // filter
        // const ruleValue = req.originalReq.ruleValue; // 配置的规则
        const storage = ctx.storage;
        // console.log('ruleValue:', req.originalReq)
        // 是内置规则，处理数据
        // if (ruleValue === 'none') {
        //     console.log('是内置规则，处理数据')
        //     handle(req, res, storage);
        // }
        (0, ql_1.handle)(req, res, storage);
        return req.passThrough();
    });
}
exports.default = default_1;
