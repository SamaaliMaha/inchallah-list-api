const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://user:user@cluster0.jpibo.mongodb.net/inchalahlistdb?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
)

//export db mongoose
module.exports = mongoose