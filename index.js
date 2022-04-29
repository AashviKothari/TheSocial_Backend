const express = require('express')
const app = express()
const mongoose=require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true},()=>{
    console.log("Connected")
});

//MiddleWares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


// ***** First Requests *****

app.get("/",(req,res)=>{
    res.send("Welcome to HomePage")
})

// app.get("/api/auth/register",(req,res)=>{
//     res.send("hello")
// })

// app.get("/users",(req,res)=>{
//     res.send("Welcome to UserPage")
// })

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)

app.listen(8800,()=>{
    console.log("Running")
})