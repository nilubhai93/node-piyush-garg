const http = require("http");

const myServer = http.createServer((req,res)=>{
    console.log(req.headers)
    res.end("Hello from server....")
});

const port=8000;
myServer.listen(port,()=>{
    console.log(`server startedonpost no ${port}...`)
})