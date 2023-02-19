const express = require("express")
const {connection} = require("./db.js")
const dotenv = require("dotenv").config()
const {fast} = require("./Routes/user.Routes.js")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())
app.use(fast)

app.listen(process.env.port, async ()=>{
    try {
        await connection
        console.log("Connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`${process.env.port} running`)
})