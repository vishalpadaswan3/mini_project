const mongoose = require("mongoose")
const { usermodel } = require("../model/user.model.js")
const bcrypt = require("bcrypt")

const author = async (req, res, next) => {
    const payload = req.body
    const user = await usermodel.find({ username: payload.username })

    const isPass = await bcrypt.compareSync(payload.password, user[0].password)

    if (isPass) {
        next()
    } else {
        res.send("Wrong username and password")
    }

}

module.exports = {
    author
}