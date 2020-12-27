const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://user:user@cluster0.jpibo.mongodb.net/inchalahlistdb?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
}
)

//export db mongoose
module.exports=mongoose