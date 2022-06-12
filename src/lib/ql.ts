
const http = require('http');
const querystring = require('querystring');
let done = 0;

/**
 * 处理请求头，响应
 * @param ctx [koa的Context对象]
 */
export function handle(req: any, res: any, storage: any): void {
    if (done == 2) {
        return;
    }
    const {host, cookie} = req.originalReq.headers;
    const xForwardedFor = req.originalReq.headers['x-forwarded-for'];
    const post_data = { host, cookie, xForwardedFor };
    var content = querystring.stringify(post_data);
    const options = {
        hostname: '127.0.0.1',
        port: 8300,
        path: '/api/handlKsjsb',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    const myreq: any = http.request(options, function (myres: any) {
        myres.setEncoding('utf8');
        myres.on('data', function (chunk: any) {
            console.log('BODY: ' + chunk);
            if (chunk.code == 0) {
                done = chunk.done;
            }
        });
    });
      
    myreq.on('error', function (e: any) {
        console.log('problem with request: ' + e.message);
    });
    // write data to request body  
    myreq.write(content);
    myreq.end();
}