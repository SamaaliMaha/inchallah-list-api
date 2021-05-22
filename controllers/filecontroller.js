const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose');
const File = require('./../models/file')

const path = require('path')

const app = express();

app.get('/', (req, res) => {
  res.send('We are at home')

});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

app.post('/upload', upload.single('myFile'), async (req, res, next) => {

  const file = req.file

  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next("hey error")
  }

  const filepost = new File({
    file: file.path
  })

  const savedfile = await filepost.save()

  res.json(savedfile)

})

app.get('/', async (req, res) => {
  const file = await model.find()
  res.json(file)
})


module.exports = app