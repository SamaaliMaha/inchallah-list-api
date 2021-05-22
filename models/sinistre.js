const mongoose = require('mongoose')


let Sinistre = mongoose.model("sinistres", {

    parcelle: { type: [mongoose.Schema.Types.Mixed], required: false },
    Location: { type: [mongoose.Schema.Types.Mixed]},
    date:{ type: String, required: true },
    risk:{ type: String, required: true },
    owner: { type: String, required: true }
})

module.exports = Sinistre