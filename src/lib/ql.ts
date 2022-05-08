const async = require('async');
const shortid = require('js-shortid');
const queue = async.queue((task: any, options: any, completed: any) => {
    console.log("Currently Busy Processing Task " + task);
    methods[options.fnkey](options).then((result: any)=>{
        if (result.isOk) {
            queue.kill();
            options.storage.setProperty('isOk', true)
        }
        const remaining = queue.length();
        completed(null, {task, remaining});
    })
  
}, 1);
queue.drain(() => {
    console.log('Successfully processed all items');
})
const rules = [
    // {
    //     name: 'jd',
    //     domain: [
    //         'jd.com',
    //         'weixin.qq.com'
    //     ],
    //     type: 1
    // },
    // {
    //     name: 'txzxg',
    //     domain: [
    //         'wzq.tenpay.com'
    //     ],
    //     type: 1
    // },
    // {
    //     name: 'hemi',
    //     domain: [
    //         '3344love.cn'
    //     ],
    //     type: 1
    // },
    {
        name: 'ks',
        domain: [
            'kuaishou.com'
        ],
        type: 1
    }
]

const methods: any = {
    'jd': handleJd,
    'txzxg': handleTxzxg,
    'hemi': handleHemi,
    'ks': handleKs,
}
function handleKs (req: any, res: any, storage: any, rule: any): any {
        console.log('handleKs:', req.headers.cookie)
        let cookieObj: any = {};
        if (storage.getProperty('cookieObj')) {
            cookieObj = storage.getProperty('cookieObj')
            console.log('cookieObj1:', cookieObj)
        }
        if (!cookieObj.ks) {
            cookieObj.ks = {}
        }
        
        const cookie = req.headers.cookie;
        const kuaishouApi_st = getCookieByKey('kuaishou.api_st', cookie);
        if (kuaishouApi_st) {
            cookieObj.ks['kuaishou.api_st'] = kuaishouApi_st;
        }
        const did = getCookieByKey('did', cookie);
        if (did) {
            cookieObj.ks['did'] = did;
        }
        cookieObj.ks.cookieStr = `kuaishou.api_st=${cookieObj.ks['kuaishou.api_st']}; did=${cookieObj.ks.did}`
        if (cookieObj.ks['kuaishou.api_st'] && cookieObj.ks['did']) {
            cookieObj.ks.isOk = true;
        }
        console.log('cookieObj2:', cookieObj)
        storage.setProperty('cookieObj', cookieObj)
    
}
function handleHemi (req: any, res: any, storage: any, rule: any): void {
    console.log('handleHemi')
}

function handleJd (req: any, res: any, storage: any, rule: any): void {
    console.log('handleJd')
}
function handleTxzxg (req: any, res: any, storage: any, rule: any): void {
    console.log('handleTxzxg')
    let cookieObj: any = {};
    if (!storage.getProperty('cookieObj')) {
        cookieObj = JSON.parse(storage.getProperty('cookieObj'))
    }
    if (!cookieObj.txzxg) {
        cookieObj.txzxg = {}
    }
    
    const cookie = req.headers.cookie;
    cookieObj.txzxg.wzq_qlskey = getCookieByKey('wzq_qlskey', cookie);
    cookieObj.txzxg.wzq_qluin = getCookieByKey('wzq_qluin', cookie);
    cookieObj.txzxg.openid = getCookieByKey('openid', cookie);
    cookieObj.txzxg.fskey = getCookieByKey('fskey', cookie);

    const TxStockCookie = `openid=${cookieObj.txzxg.openid}&fskey=${cookieObj.txzxg.fskey}&wzq_qlskey=${cookieObj.txzxg.wzq_qlskey}&wzq_qluin=${cookieObj.txzxg.wzq_qluin}`

    console.log('TxStockCookie:', TxStockCookie);
    storage.getProperty('cookieObj', JSON.stringify(cookieObj))
}
function getCookieByKey(cookieName: string, cookie: string) {
    const cookieList = cookie.split(';')
    for(let i = 0; i < cookieList.length; i++) {
      const arr = cookieList[i].split('=')
      if (cookieName == arr[0].trim()) {
        return arr[1]
      }
    }
    return ''
}

/**
 * 获取当前 URL 二级域名
 * 如果当前是 IP 地址，则直接返回 IP Address
 */
function getSubdomain(domain: any) {
    try {
        const domainList = domain.split('.');
        const len = domainList.length;
        const ipAddressReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        // 若为 IP 地址、localhost，则直接返回
        if (ipAddressReg.test(domain) || domain === 'localhost') {
            return domain;
        }
  
        if (len > 2) {
            return `${domainList[len-2]}.${domainList[len-1]}`
        } else {
            return domain;
        }
    } catch (e) {
        return domain;
    }
}

/**
 * 处理请求头，响应
 * @param ctx [koa的Context对象]
 */
export function handle(req: any, res: any, storage: any): void {
    let cookieObj: any = storage.getProperty('cookieObj');

    const host = req.originalReq.headers.host;
    for ( let i = 0; i < rules.length; i++ ) {
        let fnkey: string = '';
        for ( let k = 0; k < rules[i].domain.length; k++ ) {
            if (host.includes(rules[i].domain[k])) {
                fnkey = rules[i].name;
                if (!cookieObj[fnkey].isOk) {
                    methods[fnkey](req, res, storage)
                }
                break;
            }
        }
        if (fnkey) break;
    }
}