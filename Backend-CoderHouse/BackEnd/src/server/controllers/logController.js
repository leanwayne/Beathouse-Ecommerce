const nodemailer = require("nodemailer");
let moment = require("moment");
const model = require("../models/modelSchema");

module.exports = {
    logIn: (req, res) => {
        console.log("DESDE POST",req.session)
        if(req.session){
           return res.status(200).json(req.session)
        }else{
            return res.starus(400).json({error:"usuario no logeado"})
        }
    },

    showLogIn: (req, res) => {
        console.log("DESDE GET face", req.session)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cosmesfulanitocoderhouse@gmail.com',
                pass: 'coderhouse',
            }
        });
        if(req.session.passport.user.username){
            const attach = req.session.passport.user.photo
            const mailOptions = {
                from: 'cosmesfulanitocoderhouse@gmail.com',
                to: 'cosmesfulanitocoderhouse@gmail.com',
                subject: "Log In",
                html: `Inicio sesion de:${req.session.passport.user.username},${moment().format("DD/MM/YYYY HH:MM:SS")}`,
                attachments: [{
                    path: attach? attach : ''
                }]
            };
            transporter.sendMail(mailOptions, (err, info) => {
                console.log(info)
                if(err) console.log("error: ", err);
            })
        }   
        return res.status(200).json(req.session)
    },

    logOut: (req, res) => {
        if(req.session) {
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'skylar5@ethereal.email',
                    pass: 'aMqdHCxnvECVqXJ6nm'
                }
            });
                const user = req.session.passport || "user"
                const mailOptions = {
                    from: 'skylar5@ethereal.email',
                    to: 'skylar5@ethereal.email',
                    subject: "Log Out",
                    html: `Cierre sesion de:${user},${moment().format("DD/MM/YYYY HH:MM:SS")}`
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    console.log(info)
                    if(err) console.log("error: ", err);
                })
            return req.session.destroy(err => res.status(200).send("sesion terminada"))
        }
        return res.status(200).json(req.session)
    },

    register: async (req, res) => {  
        console.log("desde ruta register SESSION",req.session)
        res.status(200).json(req.session)
    },

    showRegister: (req, res) => { 
        if(req.session.passport){
           return res.status(200).send(req.session)
        }else{
            return res.status(400).send("no se encontro la session")
        }
    }
}