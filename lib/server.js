"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(server) {
    // 监听request请求
    server.on('request', (req, res) => {
        const { originalReq: { ruleValue, // 配置的规则
         }, } = req;
        console.log('ruleValue:', ruleValue);
        // 不是内置规则，则直接返回
        if (ruleValue !== 'none') {
            req.passThrough();
            return;
        }
        // 直接修改响应返回
        res.end('Hello World');
    });
}
exports.default = default_1;
