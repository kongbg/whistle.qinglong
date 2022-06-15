// 库
import * as http from 'http';
const axios = require('axios');
import { handle } from './ql';
const async = require('async');
let config:any = null;

const queue = async.queue(async (params:any, completed:any) => {
    const { req, res, storage } = params;
    const result:any = await handle(req, res, storage, config.table);
    console.log('处理完成了，执行回调code:', result.code)
    if (result.code == 0) {
        queue.kill()
    }
}, 1);




function checkUrl (url:String) {
    const filterList = config.host || [];
    if (!filterList) {
        return true;
    }
    if (!url || typeof url !== 'string') {
        return false;
    }
    let flag = false;
    for (let i = 0, len = filterList.length; i < len; i++) {
        const targetUrl = filterList[i];
        if (url.includes(targetUrl)) {
            flag = true;
            break;
        }
    }
    return flag;
}
function needConfig () {
    return (!config || config?.status == 0 || config && config?.status == 1 && (new Date().getTime() - config?.timestamp) > 180 * 1000);
}
function canWhistle () {
    return (config.status == 1 && (new Date().getTime() - config.timestamp) < 180 * 1000);
}

export default async function  (server: http.Server,  ctx: any) {
    // 监听request请求
    server.on('request', async (req: any, res: any) => {
        console.log('监听request请求')
        const { url } = req.originalReq;
        const { storage } = ctx;
        // 180s内不重复请求抓包配置
        if (needConfig()) {
            const result = await axios({
                url: 'http://127.0.0.1:8300/api/getWhistleConfig',                    
                method: 'get'
            });
            config = result?.data?.data || {status: 0};
        }

        // 当前是否是抓包模式
        if (!canWhistle()) {
            return req.passThrough();
        }

        // 判断是不是需要抓包的地址
        if (!checkUrl(url)) {
            return req.passThrough();
        }

        queue.push({req, res, storage}, (error: any, params: any)=>{ })
        return req.passThrough();
    });
}
