/**
 * 处理请求头，响应
 * @param ctx [koa的Context对象]
 */
export function findData(req: any, res: any): void {
    // console.log('---------------------', req.headers)
    const cookie = req.headers.cookie;
    console.log('---------------------', cookie)
}