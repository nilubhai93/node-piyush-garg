const express = require("express");
const path = require("path")
const {connectToMongoDB}= require("./connect");
const urlRouter = require("./routes/user");
const staticRouter = require("./routes/staticRouter");


const URL = require("./models/urll");

const app = express();
const PORT = 8001;


connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongodb connected"))

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/url",urlRouter);
app.use("/", staticRouter);

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