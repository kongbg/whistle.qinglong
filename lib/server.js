"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ql_1 = require("./ql");
function default_1(server) {
    // 监听request请求
    server.on('request', (req, res) => {
        // filter
        const ruleValue = req.originalReq.ruleValue; // 配置的规则
        console.log('ruleValue:', ruleValue);
        // 是内置规则，处理数据
        if (ruleValue === 'none') {
            console.log('是内置规则，处理数据');
            (0, ql_1.findData)(req, res);
        }
        return req.passThrough();
    });
}
exports.default = default_1;
