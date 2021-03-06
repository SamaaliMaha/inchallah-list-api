const express = require('express')
const jwt = require('jsonwebtoken')

const Parcelle = require('./../models/parcelle')

const app = express()

app.post('/', async (req, res) => {
    try {
        let data = req.body
        //get clé du token authorization
        let token = req.get('Authorization').substring(7)
        //decrypt token and take only userid from it
        let ownerid = jwt.verify(token, "SECRETKEY").userid

          let parcelle = new Parcelle({
              //description: data.description,
              
              adresse: data.adresse,
              
              NaturedeProduction: data.NaturedeProduction,
              RendementAttendu: data.RendementAttendu,
              PrixdeVente: data.PrixdeVente,
              NaturedeStock: data.NaturedeStock,
              Qtte: data.Qtte,
              Prix: data.Prix,
              ValeurduBatiment: data.ValeurduBatiment,
              ValeurdeProduit: data.ValeurdeProduit,
              Commentaire: data.Commentaire,
              Location: data.Location,
              risk:data.risk,
              gouv:data.gouv,
              region:data.region,
              owner: ownerid
          })

         await parcelle.save()

        res.status(201).send({ msg: "parcelle added" })
    }
    catch (error) {
        res.status(400).send({ msg: "error", error })
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
        res.status(400).send({ msg: "error", error })
    }
})

app.get('/:id', async (req, res) => {
    try {
        let token = req.get('Authorization').substring(7)
        let ownerid = jwt.verify(token, "SECRETKEY").userid

        let parcelles = await Parcelle.findOne({ _id: req.params.id  })

        res.status(200).send(parcelles)
    }
    catch (error) {
        res.status(400).send({ msg: "error", error })
    }
})

app.delete('/:id', async (req, res) => {
    try {
        let token = req.get('Authorization').substring(7)
        let ownerid = jwt.verify(token, "SECRETKEY").userid

        await Parcelle.findOneAndDelete({ _id: req.params.id })

        res.status(200).send({ msg: "parcelle deleted" })
    }
    catch (error) {
        res.status(400).send({ msg: "error" })
    }
})

/*app.post('/upload',(req,res)=>{
    if (req.files){
        console.log(req.files)
        var file=req.files.file
        var filename=file.name
        console.log(filename)
        file.mv('./uploads/'+filename,function(err){
if (err){ res.send(err)
        }
        else {
            res.send("file uploaded")
        }
    })
}
})*/

module.exports = app
