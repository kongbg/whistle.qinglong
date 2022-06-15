
const axios = require('axios');
const querystring = require('querystring');

/**
 * 处理请求头，响应
 * @param ctx [koa的Context对象]
 */
const handle = async (req: any, res: any, storage: any, method: any) => {
    const headers = JSON.stringify(req.originalReq.headers);
    const options = { headers, method };

    const result = await axios({
        url: `http://127.0.0.1:8300/api/handlWhistle`,
        method: 'post',
        data: querystring.stringify(options),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return result.data;
}

export {
    handle,
}