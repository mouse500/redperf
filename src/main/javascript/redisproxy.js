const http = require("http");
const url = require("url");
const Redis = require("ioredis");
const redis = new Redis(6379, 'localhost');


http.createServer(async function(request, response) {
        //console.log(request.url);

        if (request.method == "GET") {
            try {
                var databuf = await redis.getBuffer(request.url);
                if(databuf == null || databuf.length==0) throw new Error("No Data");
                response.writeHead(200, {"Content-Type": "application/octet-stream"});
                response.end(databuf);
                }
            catch(e) {
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.end("" + e);
            }
        } else if (request.method == "POST") {
                console.log(request.url);
                request.data = [];
                request.on('data', chunk => {
                    request.data.push(chunk);
                });
                request.on('end', async function() {
                    var databuf = Buffer.concat(request.data);
                    try {
                        await redis.setexBuffer(request.url, 300, databuf);
                    }
                    catch(e) {
                        console.log(e);
                    }
                    finally {
                        response.writeHead(200, {"Content-Type": "text/plain"});
                        response.end("ok");
                    }
                });
        }
}).listen(8088);
console.log('listening on 8088');
