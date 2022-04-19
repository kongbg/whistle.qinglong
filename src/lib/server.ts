// 库
import * as http from 'http';

export default function (server: http.Server): void {
    // 监听request请求
    server.on('request', (req: any, res) => {
        const {
            originalReq: {
                ruleValue, // 配置的规则
            },
        } = req;

        // 不是内置规则，则直接返回
        if (ruleValue !== 'none') {
            req.passThrough();
            return;
        }

        // 直接修改响应返回
        res.end('Hello World');
    });
}
