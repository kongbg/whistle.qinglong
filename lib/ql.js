"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = void 0;
const rules = [
    // {
    //     name: 'jd',
    //     domain: [
    //         'jd.com',
    //         'weixin.qq.com'
    //     ],
    //     type: 1
    // },
    {
        name: 'txzxg',
        domain: [
            'wzq.tenpay.com'
        ],
        type: 1
    }
];
const methods = {
    'jd': handleJd,
    'txzxg': handleTxzxg,
};
function handleJd(req, res, storage, rule) {
    console.log('handleJd');
}
function handleTxzxg(req, res, storage, rule) {
    console.log('handleTxzxg');
    let cookieObj = {};
    if (!storage.getProperty('cookieObj')) {
        cookieObj = JSON.parse(storage.getProperty('cookieObj'));
    }
    if (!cookieObj.txzxg) {
        cookieObj.txzxg = {};
    }
    const cookie = req.headers.cookie;
    cookieObj.txzxg.wzq_qlskey = getCookieByKey('wzq_qlskey', cookie);
    cookieObj.txzxg.wzq_qluin = getCookieByKey('wzq_qluin', cookie);
    cookieObj.txzxg.openid = getCookieByKey('openid', cookie);
    cookieObj.txzxg.fskey = getCookieByKey('fskey', cookie);
    const TxStockCookie = `openid=${cookieObj.txzxg.openid}&fskey=${cookieObj.txzxg.fskey}&wzq_qlskey=${cookieObj.txzxg.wzq_qlskey}&wzq_qluin=${cookieObj.txzxg.wzq_qluin}`;
    console.log('TxStockCookie:', TxStockCookie);
    storage.getProperty('cookieObj', JSON.stringify(cookieObj));
}
function getCookieByKey(cookieName, cookie) {
    const cookieList = cookie.split(';');
    for (let i = 0; i < cookieList.length; i++) {
        const arr = cookieList[i].split('=');
        if (cookieName === arr[0]) {
            return arr[1];
        }
    }
    return '';
}
/**
 * 处理请求头，响应
 * @param ctx [koa的Context对象]
 */
function handle(req, res, storage) {
    console.log('------req:', req.headers);
    const host = req.originalReq.headers.host;
    console.log('host:', host);
    for (let i = 0; i < rules.length; i++) {
        let fnkey = '';
        for (let k = 0; k < rules[i].domain.length; k++) {
            if (host.includes(rules[i].domain[k])) {
                fnkey = rules[i].name;
                console.log('key:', fnkey);
                methods[fnkey](req, res, storage, rules[i]);
                break;
            }
        }
        if (fnkey)
            break;
    }
}
exports.handle = handle;
