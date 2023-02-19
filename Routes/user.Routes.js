const express = require("express")
const { usermodel } = require("../model/user.model.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { author } = require("../middleware/auth.middleware.js")
const { valid } = require("../middleware/valid.middleware.js")
const { logger } = require("../middleware/logger.middleware.js")


const fast = express.Router()
fast.use(express.json())


fast.get("/", (req, res) => {
    res.send("Homepage")
})


fast.get("/data", async (req, res) => {
    const token = req.headers.authorization
    const s = await usermodel.find()
    jwt.verify(token, "masai", (error, decoded) => {
        if (decoded) {
            res.send(s)
        } else {
            res.send({ "msg": "Check again", "error": error.message })
        }
    })

})

fast.post("/register", async (req, res) => {
    const payload = req.body
    const s = await usermodel.find({ "username": payload.username })
    if (payload.password === payload.confirmpassword && s.length == 0) {
        const hashpass = await bcrypt.hashSync(payload.password, 5)
        const nap = await bcrypt.hashSync(payload.confirmpassword, 5)
        payload.password = hashpass
        payload.confirmpassword = nap

        const newUser = new usermodel(payload)
        await newUser.save()
        res.send({ "msg": "Operation done" })
    } else {
        res.send({ "msg": "Check Details or try another username" })
    }
})


fast.post("/login", logger, async (req, res) => {

    try {
        const payload = req.body
        const user = await usermodel.find({ username: payload.username })

        const isPass = await bcrypt.compareSync(payload.password, user[0].password)
        if (isPass) {
            const token = jwt.sign({ "userid": user[0]._id }, "masai", { expiresIn: "1hr" })
            console.log(user[0].username)
            res.send({ "msg": "Login Successfully", "token": token })
        } else {
            res.send("Wrong username and password")
        }

    } catch (error) {
        res.send({ "msg": "Check Details or try another username", "error": error.message })
    }

})

fast.patch("/update/:id", valid, async (req, res) => {

    const s = req.params.id
    const d = req.body

    const v = await usermodel.findByIdAndUpdate({ _id: s }, d)
    res.send("Done")


})

fast.delete("/delete/:id", valid, async (req, res) => {
    const s = req.params.id

    const v = await usermodel.findByIdAndDelete({ _id: s })
    res.send("Done")

})

module.exports = {
    fast
}