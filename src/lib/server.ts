// 库
import * as http from 'http';
import { handle } from './ql';

export default function (server: http.Server,  ctx: any): void {
    // 监听request请求
    server.on('request', (req: any, res: any) => {
        // console.log("server.on('request')")
        // filter
        // const ruleValue = req.originalReq.ruleValue; // 配置的规则
        const storage = ctx.storage;
        // console.log('ruleValue:', req.originalReq)
        // 是内置规则，处理数据
        // if (ruleValue === 'none') {
        //     console.log('是内置规则，处理数据')
        //     handle(req, res, storage);
        // }
        handle(req, res, storage);
        return req.passThrough();
    });
}
