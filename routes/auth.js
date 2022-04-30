const router = require('express').Router();
const User = require
("../models/User")
const bcrypt = require('bcrypt')

router.get("/register", async (req,res)=>{
    const user = await new User({
        username:"Aahv",
        email:"Aashv@gmil.com",
        password:"12jkk3456"
    })

    await user.save()
    res.send("Ok")

})

router.post('/register', async(req,res)=>{
    
    

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword        
    
        });

        const user = await newUser.save();
        res.status(200).json(user)
    } catch(err){
        console.log(err)
    }

});

//Login
router.get("/login", async (req,res)=>{
    res.send("Well")
})

router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email});
        !user && res.status(404).json("UNF");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router