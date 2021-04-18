const express = require('express')
const jwt = require('jsonwebtoken')

const Task = require('./../models/parcelle')

const app = express()

app.post('/', async (req, res) => {
    try {
        let data = req.body
        //get clé du token authorization
        let token = req.get('Authorization').substring(7)
        //decrypt token and take only userid from it
        let ownerid = jwt.verify(token, "SECRETKEY").userid

        let parcelle = new Parcelle({
            description: data.description,
            adresse:data.adresse,
            NaturedeProduction: data.NaturedeProduction,
            RendementAttendu: data.RendementAttendu,
            PrixdeVente: data.PrixdeVente,
            RisquesPossibles: data.RisquesPossibles,
            NaturedeStock: data.NaturedeStock,
            Qtte: data.Qtte,
            Prix: data.Prix,
            ValeurduBatiment: data.ValeurduBatiment,
            ValeurdeProduit: data.ValeurdeProduit,
            Commentaire: data.Commentaire,
            owner: ownerid
        })

        await parcelle.save()

        res.status(201).send({ msg: "parcelle added" })
    }
    catch (error) {

        res.status(400).send({ msg: "error" })
    }
})
app.get('/', async (req, res) => {
    try {
        let token = req.get('Authorization').substring(7)
        let ownerid = jwt.verify(token, "SECRETKEY").userid

        let parcelles = await Parcelle.find({ owner: ownerid })

        res.status(200).send(parcelles)
    }
    catch (error) {
        res.status(400).send({ msg: "error" })
    }
})
module.exports = app
