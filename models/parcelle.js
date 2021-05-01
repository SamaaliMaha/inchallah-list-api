const mongoose = require('mongoose')


let Parcelle = mongoose.model("parcelles", {
    adresse: { type: String, required: false },
    NaturedeProduction: { type: String, required: false },
    RendementAttendu: { type: String, required: false },
    PrixdeVente: { type: String, required: false },
    RisquesPossibles: { type: String, required: false },
    NaturedeStock: { type: String, required: false },
    Qtte: { type: String, required: false },
    Prix: { type: String, required: false },
    ValeurduBatiment: { type: String, required: false },
    ValeurdeProduit: { type: String, required: false },
    Commentaire: { type: String, required: false },
    Location: { type: [mongoose.Schema.Types.Mixed]},

    owner: { type: String, required: true }
})

module.exports = Parcelle