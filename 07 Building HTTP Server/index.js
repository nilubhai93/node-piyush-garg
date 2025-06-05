const http = require("http");
const fs = require("fs")

const myServer = http.createServer((req,res)=>{

    const log =`${Date.now()}:New Req Received\n`;
    fs.appendFile("log.txt",log,(err,data)=>{
        res.end("Hello from server Again");
    })
    
});

const port=8000;
myServer.listen(port,()=>{
    console.log(`server startedonpost no ${port}...`)
})