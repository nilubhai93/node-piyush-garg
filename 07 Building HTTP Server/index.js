const http = require("http");
const fs = require("fs")

const myServer = http.createServer((req, res) => {

    const log = `${Date.now()}:${req.url} New Req Received\n`;
    fs.appendFile("log.txt", log, (err, data) => {
        switch (req.url) {
            case "/":
                res.end("HomePage");
                break;
            case "/about":
                res.end("this is about")
                break;
            default:
                res.end("404 error not found")
        }
    })

});

const port = 3000;
myServer.listen(port, () => {
    console.log(`server startedonpost no ${port}...`)
})