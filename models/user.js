const mongoose = require('mongoose')

let User = mongoose.model("users", {
    name: { type: String, required: true },
    //age: { type: Number, required: true },
    LastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    CINNumber: { type: String, required: true, unique: true },
    PhoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Codexpert:{ type: String, required: false,unique: true}
})

module.exports = User