const express = require("express")
const hbs = require("hbs")
const bodyparser = require("body-parser")
const session = require("express-session")
const path = require("path")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/UserList", {
    useNewUrlParser: true
});

var User = mongoose.model("user", {
    username: String,
    email: String,
    password: String    
});

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false
});

app.use(express.static(__dirname))

app.set("view engine", "hbs")
app.use(express.static(__dirname+"/public"))

app.use(cookieparser())

app.get("/", (req, res) => {
    console.log("GET /")

    res.render("index.hbs")
})

app.get("/html/back", (req,res) => {
    console.log("GET /BACK")

    res.render("index.hbs")
})

app.get("/html/register", (req, res) => {
    console.log("GET /REGISTER")

    res.render("register.hbs")
})

app.get("/html/home", (req, res) => {
    console.log("GET /HOME")

    res.render("home.hbs")
})

app.get("/html/search", (req, res) => {
    console.log("GET /SEARCH")

    res.render("search.hbs")
})

app.get("/html/reserve", (req, res) => {
    console.log("GET /RESERVE")

    res.render("selectLabRm.hbs")
})

app.get("/html/reservations", (req, res) => {
    console.log("GET /RESERVATIONS")

    res.render("reservations.hbs")
})

app.post("/html/add", urlencoder, (req, res) => {
    console.log("POST /ADD")

    var username = req.body.username
    var mail = req.body.email
    var password = req.body.identification
    
    if(mail && password && username) {

        User.find({
            username,
            email: mail
        }).then((doc) => {
            if(doc.length == 0) {
                var newUser = new User({
                    username,
                    email: mail,
                    password
                })

                newUser.save().then(() => {
                    console.log("A new user has been added")
                    res.redirect("/")
                }, (error) => {
                    console.log(error)
                })

            } else {
                res.render("register.hbs", {
                    big_error: "Email/ Username is already in use"
                })
            }
        }, (error) => {
            console.log(error)
        })
    } else if(mail && password && !username) {
        res.render("register.hbs", {
            username_error: "Please enter a username"
        })
    } else if(mail && !password && username) {
        res.render("register.hbs", {
            username_error: "Please enter a password"
        })
    } else if(!mail && password && username) {
        res.render("register.hbs", {
            username_error: "Please enter an email"
        })
    } else {
        res.render("register.hbs", {
            big_error: "Incomplete credentials! Please fill out the form again"
        })
    } 
})

app.post("/html/log", urlencoder, (req,res) => {
    console.log("POST /LOG")

    var mail = req.body.email
    var password = req.body.identification
    var username = req.body.username

    if(mail && password) {

        User.findOne({
            email: mail
        }).then((doc) => {
            if(doc) {
                if(doc.password == password) {
                    res.render("home.hbs", {
                        username: doc.username
                    })
                } else {
                    res.render("index.hbs", {
                        big_error: "Password doesn't match" 
                    })
                }
            } else {
                res.render("index.hbs", {
                    big_error: "User does not exist"
                })
            }
        }, (error) => {
            console.log(error)
        })

    } else if(mail && !password) {
        res.render("index.hbs", {
            password_error: "Please enter a password"
        })
    } else if(!mail && password) {
        res.render("index.hbs", {
            email_error: "Please enter an email address"
        })
    } else {
        res.render("index.hbs", {
            big_error: "Please accomplish all fields"
        })
    }
})

<<<<<<< HEAD
app.post("/html/logout", (req, res) => {
    console.log("POST /LOGOUT")

    res.redirect("/")
})
=======


>>>>>>> d0d47fa214a995dbcf0ddae1687ec6539b7c580a

app.listen(3000, () => {
    console.log("Listening in port 3000");
})