"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.update = void 0;
/**
 * 更新接口
 * @param ctx [koa的Context对象]
 */
async function update(ctx) {
    try {
        // 储存配置数据
        ctx.storage.setProperty('list', ctx.request.body.list || []);
        // 返回结果
        return {
            code: 0,
            data: [],
            message: '',
        };
    }
    catch (error) {
        // 存储异常
        return {
            code: -1,
            data: [],
            message: error.stack || error.toString(),
        };
    }
}
exports.update = update;
/**
 * 获取所有配置
 * @param ctx [koa的Context对象]
 */
async function list(ctx) {
    const result = {
        code: 0,
        message: '',
        data: [],
    };
    try {
        result.data = ctx.storage.getProperty('list') || [];
    }
    catch (error) {
        // do nothing
    }
    return result;
}
exports.list = list;
