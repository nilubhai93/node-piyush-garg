const {nanoid} = require("nanoid");
const URL = require("../models/url");


async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body)
}