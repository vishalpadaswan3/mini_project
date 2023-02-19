const fs = require("fs")
const {usermodel} = require("../model/user.model.js")


const logger = async (req,res,next) => {
    
    const {username} = req.body
    
    const tm = await usermodel.find({username})
    const s = tm[0].role

    fs.appendFileSync("../log.txt",`Username is ${username} | Role is ${s}  \n`)
    next()
}




module.exports = {
    logger
}