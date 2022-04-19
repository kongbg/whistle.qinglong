// 库
import * as http from 'http';
import { findData } from './ql';

export default function (server: http.Server): void {
    // 监听request请求
    server.on('request', (req: any, res: any) => {
        // filter
        const ruleValue = req.originalReq.ruleValue; // 配置的规则
        console.log('ruleValue:', ruleValue)
        // 是内置规则，处理数据
        if (ruleValue === 'none') {
            console.log('是内置规则，处理数据')
            findData(req, res);
        }
        return req.passThrough();
    });
}
