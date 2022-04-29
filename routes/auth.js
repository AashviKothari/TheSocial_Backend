const router = require('express').Router();
const User = require("../models/User")

//Register

router.get("/register", async (req,res)=>{
    const user = await new User({
        username : "vi",
        email : "Ak@gmail.com",
        password : "1234856"
    })

    await user.save();
})

module.exports = router