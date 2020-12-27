const mongoose = require('mongoose')

let User = mongoose.model("users", {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

})

module.exports=User