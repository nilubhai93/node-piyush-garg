const express = require("express");
const { route } = require("./user");
const router = express.Router();

router.get("/", async(req,res)=>{
    const allurls = await URL.find({})
    return res.render("home")
})

module.exports = router;