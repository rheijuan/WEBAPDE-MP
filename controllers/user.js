const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bodyparser = require("body-parser")
const nodemailer = require("nodemailer")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

var smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "", // replace this with personal gmail account when testing
        pass: ""  // password of the gmail account ^
    }
})

var rand, mailOptions, host, link

/****  Function used to log in  ****/
router.post("/log", urlencoder, function(req, res) {
    console.log("POST /log")

    var email = req.body.email
    var password = req.body.identification

    if(email && password) {
        User.findByEmail(email).then((user) => {
            if(user) {
                if(email == user.email && password == user.password) {
                    if(user.validated) {
                        res.locals.username = user.username
                        res.render("home" , {
                            username: user.username
                        })
                    } else {
                        res.render("index", {
                            error: "Please validate your account"
                        })
                    }
                } else {
                    res.render("index", {
                        error: "Wrong credentials, please fill up again"
                    })
                }
            } else {
                res.render("index", {
                    error: "User does not exist"
                })
            }
        }, (error) => {
            console.log(error)
        })
    } else {
        res.render("index" , {
            error: "Incomplete credentials, please fill up again"
        })
    }
})

/****  Function used to register  ****/
router.post("/add", urlencoder, (req, res) => {
    console.log("POST /user/add")

    var username = req.body.username
    var email = req.body.email
    var password = req.body.identification

    if(username && email && password) {
        
        User.findByEmail(email).then((user) => {
            if(user) {
                res.render("register" , {
                    error: "Wrong credentials, please fill up again"
                })
            }
            else {

                rand=Math.floor((Math.random() * 100) + 54)

                var newUser = {
                    username,
                    email, 
                    password,
                    reservations: [],
                    validated: false,
                    isAdmin: false,
                    verification: rand
                }

                User.create(newUser).then((user) => {
                    console.log("A user has been successfully added. Sending an email...")

                    host=req.get('host')        
                    link="http://"+req.get('host')+"/user/verify?id="+rand
                    
                    console.log(newUser)
                    mailOptions={
                        to: req.body.email,
                        subject: "[LAB.RES.SYS Verification]",
                        text: "That was easy!",
                        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
                    }

                    smtpTransport.sendMail(mailOptions, function(error, response){
                        if(error) {
                            console.log(error);
                            res.render("register", {
                                error: "Wrong/ Incomplete credentials, please fill up again"
                            })
                        } else{
                           console.log("Message sent");
                        }
                    })

                }, (error) => {
                    console.log(error)
                })
                res.redirect("/")
            }
        }, (error) => {
            console.log(error)
        }) 
        
    } else 
        res.render("register" , {
            error: "Incomplete credentials, please fill up again"
        })
})

/****  Function used to verify  ****/
 router.get("/verify", function(req, res) {
    console.log("GET /user/verify")

    if((req.protocol+"://"+req.get('host'))==("http://"+host)) {
        
        console.log("Domain is matched. Information is from Authentic email")

        if(req.query.id==rand) {
            User.findAccountToVerify(req.query.id).then((users) => {
                for(var i = 0; i < users.length; i++) {
                    User.validateAccount(users[i]._id, true).then((updatedUser) => {
                        console.log("User has been validated")
                    }, (error) => {
                        console.log(error)
                    })
                }
            }, (error) => {
                console.log(error)
            })
        }
        else 
            console.log("email is not verified")
    }

    res.redirect("/")
 })

module.exports = router