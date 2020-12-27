const express = require('express')
const jwt = require('jsonwebtoken')

const Task = require('./../models/task')

const app = express()

app.post('/', async (req, res) => {
    try {
        let data = req.body
        //get clé du token authorization
        let token = req.get('Authorization').substring(7)
        //decrypt token and take only userid from it
        let ownerid = jwt.verify(token, "SECRETKEY").userid

        let task = new Task({
            description: data.description,
            owner: ownerid
        })

        await task.save()

        res.status(201).send({ msg: "task added" })
    }
    catch (error) {
        res.status(400).send({ msg: "error" })
    }
})

app.get('/', async (req, res) => {
    try {
        let token = req.get('Authorization').substring(7)
        let ownerid = jwt.verify(token, "SECRETKEY").userid

        let tasks = await Task.find({ owner: ownerid })

        res.status(200).send(tasks)
    }
    catch (error) {
        res.status(400).send({ msg: "error" })
    }
})

app.put('/:id', async (req, res) => {
    try {
        let token = req.get('Authorization').substring(7)
        let ownerid = jwt.verify(token, "SECRETKEY").userid

        await Task.findOneAndUpdate({ _id: req.params.id }, req.body)

        res.status(200).send({ msg: "task updated" })
    }
    catch (error) {
        res.status(400).send({ msg: "error" })
    }
})

app.delete('/:id', async (req, res) => {
    try {
        let token = req.get('Authorization').substring(7)
        let ownerid = jwt.verify(token, "SECRETKEY").userid

        await Task.findOneAndDelete({ _id: req.params.id })

        res.status(200).send({ msg: "task deleted" })
    }
    catch (error) {
        res.status(400).send({ msg: "error" })
    }
})
//export app
module.exports = app