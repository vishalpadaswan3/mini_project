const mongoose = require("mongoose")
const { usermodel } = require("../model/user.model.js")
const bcrypt = require("bcrypt")


const valid = async (req, res, next) => {

    const s = req.params.id
    try {
        const user = await usermodel.find({ _id: s })
        if (user[0].role === "Admin") {
            next()
        } else {
            res.send({ "msg": "You Dont have access" })
        }
    } catch (error) {
        res.send({ "msg": "Wrong id", "error": error.message })
    }

}

module.exports = {
    valid
}