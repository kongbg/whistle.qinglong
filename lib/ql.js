"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findData = void 0;
/**
 * 处理请求头，响应
 * @param ctx [koa的Context对象]
 */
function findData(req, res) {
    // console.log('---------------------', req.headers)
    const cookie = req.headers.cookie;
    console.log('---------------------', cookie);
}
exports.findData = findData;
