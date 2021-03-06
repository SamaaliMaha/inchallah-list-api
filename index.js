//importer methode de la classe express (creation d'un objet)
const express = require('express')
const multer=require('multer')
const path= require('path')
const cors = require('cors')
//import db mongoose
const mongoose = require('./db/config')

//declare user and task controllers (import)
const userController = require('./controllers/userController')
const taskController = require('./controllers/taskController')
const parcelleController = require('./controllers/parcelleController')
const sinistreController = require('./controllers/sinistreController')
const fileController = require('./controllers/fileController')

const app = express()

const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'));

//distinguer path
app.use('/user', userController)
app.use('/task', taskController)
app.use('/parcelle', parcelleController)
app.use('/sinistre', sinistreController)
app.use('/file', fileController)

app.get('/', (req, res) => {
    res.status(200).send("Welcome to server")
})

//fonction qui crée un serveur
app.listen(port, () => {
    console.log("server started")
})



































/*
//creation API
app.get('/abc', (req, res) => {
    let obj = { message: "API works" }
    res.status(200).send(obj)

})
//send data in URL
app.get('/hello/:username', (req, res) => {
    let name = req.params.username
    let obj = { message: "hello " + name }
    res.status(200).send(obj)
})
//method POST API and send data in body
app.post('/add', (req, res) => {
    let data = req.body
    console.log(data)
    res.status(200).send({ msg: "user added" })
})


//mywork
app.post('/mywork/add', (req, res) => {
    let name = req.body.name
    let lname = req.body.lname
    let result = name + lname
    console.log(name)
    console.log(lname)
    res.status(200).send("my name is " + result)
})


*/