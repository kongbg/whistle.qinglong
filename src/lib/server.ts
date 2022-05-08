// 库
import * as http from 'http';
import { handle } from './ql';

export default function (server: http.Server,  ctx: any): void {
    // 监听request请求
    server.on('request', (req: any, res: any) => {
        const storage = ctx.storage;
        handle(req, res, storage);
        return req.passThrough();
    });
}
