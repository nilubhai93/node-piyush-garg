const express = require('express');
const fs = require('fs');

const{connectMongoDB}= require("./connection")
const userRouter = require("./routes/user")

const app = express();
const PORT = 8000;


// connect to mongoose
connectMongoDB("mongodb://127.0.0.1:27017/piyush-db-1");


// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    fs.appendFile(
        "log.txt",
        `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
        (err, data) => {
            next();
        }
    );
});


//routes
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));