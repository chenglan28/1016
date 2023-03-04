var http = require("http"),
fs = require("fs"),
md5 = require("./md5");//引用库
var info = require("./info"),
user = JSON.parse(fs.readFileSync("user.json").toString());//载入数据
app = http.createServer((req,res)=>{
    if(req.url == "/"){
        res.writeHead(200,{
            "Content-Type": "text/html; charset=utf-8"
        });
        res.end(fs.readFileSync(info.view + "index.html"));
    }//加载主UI
    else if(req.url == "/$.js"){
        res.writeHead(200,{
            "Content-Type": "application/octet-stream"
        });
        res.end(fs.readFileSync(info.view + "$.js"));
    }//加载库
    else if(req.url == "/login"){
        var body = "";
        req.on("data",chunk=>body += chunk);
        req.on("end",()=>{
            try {
                body = JSON.parse(body);
                var hasUser = 0;
                user.forEach(item=>{
                    if(item.username == body.username){
                        hasUser = 1;
                        if(md5(item.password) == body.password){
                            res.writeHead(200,{
                                "Content-Type": "application/json"
                            });
                            res.end(JSON.stringify({
                                "msg": "OK"
                            }));
                        }
                        else {
                            res.writeHead(200,{
                                "Content-Type": "application/json"
                            });
                            res.end(JSON.stringify({
                                "err": "Incorrect Password"
                            }));
                        }
                    }
                });
                if(hasUser == 0){
                    res.writeHead(200,{
                        "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify({
                        "err": "The User Does Not Exist"
                    }));
                }
            }catch(err){
                console.log(err);
                res.writeHead(200,{
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    "err": "Unknow Error"
                }));
            }
        })
    }//登录
    else if(req.url == "/log"){
        var body = "";
        req.on("data",chunk=>body += chunk);
        req.on("end",()=>{
            try {
                body = JSON.parse(body);
                var hasUser = 0;
                user.forEach(item=>{
                    if(item.username == body.username){
                        hasUser = 1;
                        if(md5(item.password) == body.password){
                            res.writeHead(200,{
                                "Content-Type": "application/json"
                            });
                            res.end(JSON.stringify({
                                "msg": fs.readFileSync("log.txt").toString()
                            }));
                        }
                        else {
                            res.writeHead(200,{
                                "Content-Type": "application/json"
                            });
                            res.end(JSON.stringify({
                                "err": "Incorrect Password"
                            }));
                        }
                    }
                });
                if(hasUser == 0){
                    res.writeHead(200,{
                        "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify({
                        "err": "The User Does Not Exist"
                    }));
                }
            }catch(err){
                console.log(err);
                res.writeHead(200,{
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    "err": "Unknow Error"
                }));
            }
        })
    }//获取日志
});//创建服务器
app.listen(info.port,()=>console.log(`服务器开放于 ${info.port} 端口`));//开启服务器