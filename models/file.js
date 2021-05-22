const mongoose = require('mongoose')

const fileSchema = mongoose.Schema(
    {
        file: {
            type: String,
            required: true
        }
    }
);

let File = mongoose.model("Files", fileSchema)

module.exports = File