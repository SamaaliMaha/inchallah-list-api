const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

const User = require('./../models/user')

const app = express()

app.post('/register', async (req, res) => {
    try {
        let data = req.body

        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))

        let user = new User({
            name: data.name,
            LastName: data.LastName,
            email: data.email,
            password: data.password,
            CINNumber: data.CINNumber,
            PhoneNumber:data.PhoneNumber,
            email: data.email,
            password: data.password,
            ConfirmPassword:data.ConfirmPassword
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

app.post('/forgot-password', async (req, res) => {
    try {
        //recuperation data
        let data = req.body
        //verify email
        let user = await User.findOne({ email: data.email })

        if (!user) {
            res.status(404).send({ msg: "user not found" })
        } else {

            let newPassword = generateNewPassword(10)

            user.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))

            await user.save()

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "mahasmaali18@gmail.com", // generated ethereal user
                    pass: mdp.pass, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"maha smaali " <mahasmaali18@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: "Nouveau mot de passe ✔", // Subject line
                text: "Nouveau mot de passe : " + newPassword, // plain text body
                html: "<b>Nouveau mot de passe : " + newPassword + "</b>", // html body
            });


            res.status(200).send({ message: "Password updated" })
        }

    } catch (error) {
        res.status(400).send(error)
    }
})

function generateNewPassword(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

//export app
module.exports = app