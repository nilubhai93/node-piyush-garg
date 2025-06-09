
const express = require("express")

const app= express();

app.get("/" , (req,res)=>{
    return res.send("hello from home page");
})

app.get("/about" , (req,res)=>{
    return res.send(`hello ${req.query.name }`);
})

app.get("/contact" , (req,res)=>{
    return res.send("hello from contact");
})



const port = 3000;
app.listen(port, () => {
    console.log(`server startedonpost no ${port}...`)
})