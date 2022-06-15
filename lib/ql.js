"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = void 0;
const axios = require('axios');
const querystring = require('querystring');
/**
 * 处理请求头，响应
 * @param ctx [koa的Context对象]
 */
const handle = async (req, res, storage, method) => {
    const headers = JSON.stringify(req.originalReq.headers);
    console.log('headers:', headers);
    const options = { headers, method };
    const result = await axios({
        url: `http://127.0.0.1:8300/api/handlWhistle`,
        method: 'post',
        data: querystring.stringify(options),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    console.log('result:', result.data);
    return result.data;
};
exports.handle = handle;
