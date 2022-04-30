const router = require('express').Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

//Update User
router.put("/:id", async(req,res)=>{
    if(req.body.userId == req.params.id || req.user.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("AUS")
        }catch(err)
        {
            return res.status(500).json(err)
        }
    } else{
        return res.status(403).json("You can only Update your Account")
    }
})
//Delete User
//get a user
//get all user
module.exports = router