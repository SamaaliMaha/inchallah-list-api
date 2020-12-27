const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./../models/user')

const app = express()

app.post('/register', async (req, res) => {
    try {
        let data = req.body

        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))

        let user = new User({
            name: data.name,
            age: data.age,
            email: data.email,
            password: data.password
        })

        await user.save()

        res.status(200).send({ msg: "user added" })
    }
    catch (error) {
        res.status(400).send({ msg: "error" })

    }
})

app.post('/login', async (req, res) => {
    try {
        //recuperation data
        let data = req.body
        //verify email
        let user = await User.findOne({ email: data.email })

        if (!user) {
            res.status(404).send({ msg: "user not found" })
        } else {
            //if email is coorect verify pw with bcrypt library

            let compare = bcrypt.compareSync(data.password, user.password)

            if (!compare) {
                res.status(404).send({ msg: "user not found" })
            } else {
                //get id token with jwt library

                let token = jwt.sign({ userid: user._id }, "SECRETKEY")

                res.status(200).send({ token })
            }

        }

    } catch (error) {
        res.status(400).send(error)
    }
})


//export app
module.exports = app