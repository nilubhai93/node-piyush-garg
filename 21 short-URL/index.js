const express = require("express");
const {connectToMongoDB}= require("./connect");
const urlRouter = require("./routes/user");

const URL = require("./models/urll");

const app = express();
const PORT = 8001;


connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongodb connected"))

app.use(express.json());

app.use("/url",urlRouter);

app.get("/:shortId",async (req,res)=>{
    const shortId = req.params.shortId;
    await URL.findByIdAndUpdate(
        {shortId},
        {$push:
            {visitHistory:{
                timestamp:Date.now()},
            },
        }
    );
    res.redirect(entry.redirectURL);  
})

app.listen(PORT,()=>{
    console.log("Server is running...")
})