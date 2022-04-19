"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 库
const Koa = require("koa");
const path = require("path");
const KoaStatic = require("koa-static");
const KoaBodyParser = require("koa-bodyparser");
// 全局常量
const app = new Koa();
// 解析post数据
app.use(KoaBodyParser({
    jsonLimit: '5MB',
}));
function default_1(server, options) {
    // 静态资源
    app.use(KoaStatic(path.join(__dirname, '../public')));
    // 正常的路由
    app.use(async (ctx) => {
        // 获取必要参数
        const pathArr = ctx.path.split('/').slice(1);
        // 补全路径
        if (pathArr.length === 0) {
            pathArr.push('index');
        }
        else if (pathArr.length === 1) {
            pathArr.push('init');
        }
        const methodName = pathArr.slice(-1).toString();
        const modulePath = `${path.join(__dirname, '../router', pathArr.slice(0, -1).join('/'))}`;
        // 设置whistle的插件数据储存对象
        ctx.storage = options.storage;
        // 加载对应的模块实例
        const moduleInstance = await Promise.resolve().then(() => require(modulePath));
        // 执行对应方法
        ctx.body = await moduleInstance[methodName](ctx);
    });
    // 监听request请求
    server.on('request', app.callback());
}
exports.default = default_1;
