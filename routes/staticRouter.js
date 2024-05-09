const express = require("express");
const router = express.Router();
const URL = require("../models/url");

router.get('/',(req,res)=>{
    return res.render("home")
})

router.get("/test",async (req,res)=>{
    const allUrl = await URL.find({})
    return res.render("showData",{
        urls: allUrl,  
    })
})

module.exports = router;
