const express = require("express");
const urlRoute = require ("./routes/router");
const app = express();
const PORT = 8000;



app.use("/url",urlRoute);



app.listen(PORT,()=>{
    console.log("Server is running...")
})