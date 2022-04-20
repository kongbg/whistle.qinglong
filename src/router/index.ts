// 库
import {
    Context,
} from 'koa';
// 定义
interface Result {
    code: number;
    data: string[];
    message: string;
}

/**
 * 更新接口
 * @param ctx [koa的Context对象]
 */
export async function update(ctx: Context): Promise<Result> {
    try {
        // 储存配置数据
        ctx.storage.setProperty('list', ctx.request.body.list || []);
        // 返回结果
        return {
            code: 0,
            data: [],
            message: '',
        };
    } catch (error) {
        // 存储异常
        return {
            code: -1,
            data: [],
            message: error.stack || error.toString(),
        };
    }
}

/**
 * 获取所有配置
 * @param ctx [koa的Context对象]
 */
export async function list(ctx: Context): Promise<Result> {
    const result = {
        code: 0,
        message: '',
        data: [] as string[],
    };
    try {
        result.data = ctx.storage.getProperty('list') || [];
    } catch (error) {
        // do nothing
    }
    return result;
}


/**
 * 更新configs接口
 * @param ctx [koa的Context对象]
 */
 export async function updateConfig(ctx: Context): Promise<Result> {
    try {
        // 储存配置数据
        ctx.storage.setProperty('configs', ctx.request.body.configs || []);
        // 返回结果
        return {
            code: 0,
            data: [],
            message: '',
        };
    } catch (error) {
        // 存储异常
        return {
            code: -1,
            data: [],
            message: error.stack || error.toString(),
        };
    }
}

/**
 * 获取所有configs配置
 * @param ctx [koa的Context对象]
 */
export async function configs(ctx: Context): Promise<Result> {
    const result = {
        code: 0,
        message: '',
        data: [] as string[],
    };
    try {
        result.data = ctx.storage.getProperty('configs') || [];
    } catch (error) {
        // do nothing
    }
    return result;
}
