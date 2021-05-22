const express = require('express')
const jwt = require('jsonwebtoken')

const Sinistre = require('./../models/sinistre')

const app = express()

app.post('/', async (req, res) => {
    try {
        let data = req.body
        //get clé du token authorization
        let token = req.get('Authorization').substring(7)
        //decrypt token and take only userid from it
        let ownerid = jwt.verify(token, "SECRETKEY").userid

          let sinistre = new Sinistre({
              //description: data.description,
              
              parcelle: data.parcelle,
              Location: data.Location,
              date:data.date,
              risk:data.risk,
              owner: ownerid
          })

         await sinistre.save()

        res.status(201).send({ msg: "sinistre added" })
    }
    catch (error) {
        res.status(400).send({ msg: "error", error })
    }
})
app.get('/', async (req, res) => {
    try {
        let token = req.get('Authorization').substring(7)
        let ownerid = jwt.verify(token, "SECRETKEY").userid

        let sinistres = await Sinistre.find({ owner: ownerid })

        res.status(200).send(sinistres)
    }
    catch (error) {
        res.status(400).send({ msg: "error", error })
    }
})

app.get('/:id', async (req, res) => {
    try {
        let token = req.get('Authorization').substring(7)
        let ownerid = jwt.verify(token, "SECRETKEY").userid

        let sinistres = await Sinistre.findOne({ _id: req.params.id  })

        res.status(200).send(sinistres)
    }
    catch (error) {
        res.status(400).send({ msg: "error", error })
    }
})

app.delete('/:id', async (req, res) => {
    try {
        let token = req.get('Authorization').substring(7)
        let ownerid = jwt.verify(token, "SECRETKEY").userid

        await Sinistre.findOneAndDelete({ _id: req.params.id })

        res.status(200).send({ msg: "sinistre deleted" })
    }
    catch (error) {
        res.status(400).send({ msg: "error" })
    }
})

module.exports = app
