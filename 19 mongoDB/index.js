const express = require('express');

const{connectMongoDB}= require("./connection")
const {logReqRes} = require("./middleware")
const userRouter = require("./routes/user")

const app = express();
const PORT = 8000;


// connect to mongoose
connectMongoDB("mongodb://127.0.0.1:27017/piyush-db-1").then(()=>{
    console.log("MongoDB connected!")
});


// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));


//routes
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));