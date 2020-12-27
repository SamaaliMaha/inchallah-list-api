const mongoose = require('mongoose')

let Task = mongoose.model("tasks", {
    description: { type: String, required: true },
    owner: { type: String, required: true },
    completed: { type: Boolean, default: false },
})

module.exports = Task