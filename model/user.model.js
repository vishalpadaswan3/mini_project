const mongoose = require("mongoose")

const Userschema = mongoose.Schema({
    username : String,
    email : String,
    dob : String,
    role : String,
    location : String,
    password : String,
    confirmpassword : String

})

const usermodel = mongoose.model("minipr",Userschema)


module.exports = {
    usermodel
}
