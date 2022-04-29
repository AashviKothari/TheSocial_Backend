const router = require('express').Router();

router.get("/",(req,res)=>{
    res.send("User Routes")
})

module.exports = router