"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async = require('async');
let task = 0;
let filterList = ['api.kuaishouzt.com'];
const queue = async.queue((params, completed) => {
    console.log("当前正在处理 " + params.task);
    console.log('异步处理其他事情');
    // Simulating a Complex task
    setTimeout(() => {
        // The number of tasks to be processed
        const remaining = queue.length();
        console.log('处理完成了，执行回调');
        completed(null, { task: params.task, remaining });
    }, 1000);
}, 1);
function getId() {
    return parseInt((Math.random() * 10000).toString());
}
function checkUrl(url) {
    console.log('checkUrl:', url);
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
function default_1(server, ctx) {
    // 监听request请求
    server.on('request', (req, res) => {
        const storage = ctx.storage;
        if (!checkUrl(req.originalReq.url)) {
            return;
        }
        const task = getId();
        queue.push({ task, req, res, storage }, (error, params) => {
            if (error) {
                console.log(`出错了哦 ${params.task}`);
            }
            else {
                console.log(`任务完成 ${task}. 还有${params.remaining}个 `);
            }
        });
        // handle(req, res, storage);
        return req.passThrough();
    });
}
exports.default = default_1;
