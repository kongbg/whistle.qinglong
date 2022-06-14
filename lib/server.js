"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const ql_1 = require("./ql");
const async = require('async');
let task = 0;
let config = null;
const queue = async.queue(async (params, completed) => {
    const { req, res, storage } = params;
    console.log("当前正在处理");
    console.log('异步处理其他事情');
    const result = await (0, ql_1.handle)(req, res, storage, config.table);
    const remaining = queue.length();
    console.log('处理完成了，执行回调:', result);
    if (result.code == 0) {
        completed(null, { remaining });
    }
    else {
        completed(result.data.code, { remaining });
    }
}, 1);
function checkUrl(url) {
    console.log('checkUrl:', url);
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
function needConfig() {
    return (!config || config.status == 0 || config && config.status == 1 && (new Date().getTime() - config.timestamp) > 180 * 1000);
}
function canWhistle() {
    return (config.status == 1 && (new Date().getTime() - config.timestamp) < 180 * 1000);
}
async function default_1(server, ctx) {
    // 监听request请求
    server.on('request', async (req, res) => {
        var _a, _b;
        console.log('监听request请求');
        const { url } = req.originalReq;
        const { storage } = ctx;
        // 180s内不重复请求抓包配置
        if (needConfig()) {
            const result = await axios({
                url: 'http://127.0.0.1:8300/api/getWhistleConfig',
                method: 'get'
            });
            config = ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.data) && ((_b = result === null || result === void 0 ? void 0 : result.data) === null || _b === void 0 ? void 0 : _b.data[0]);
            console.log('config:', config);
        }
        // 当前是否是抓包模式
        if (!canWhistle()) {
            return req.passThrough();
        }
        // 判断是不是需要抓包的地址
        if (!checkUrl(url)) {
            return req.passThrough();
        }
        queue.push({ req, res, storage }, (error, params) => {
            if (error) {
                console.log(`出错了哦`, error, params);
            }
            else {
                console.log(`任务完成. 还有${params.remaining}个 `);
            }
        });
        return req.passThrough();
    });
}
exports.default = default_1;
