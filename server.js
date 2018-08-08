/**********IMPORTS***********/
const express = require("express")
const hbs = require("hbs")
const bodyparser = require("body-parser")
const session = require("express-session")
const path = require("path")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const details = require("./models/details.js").details

/********** SETUP ***********/
const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: false
});

app.set("view engine", "hbs")

app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname))

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/UserList", {
    useNewUrlParser: true
});

var User = mongoose.model("user", {
    username: String,
    email: String,
    password: String    
});

app.use(cookieparser())

/********** ROUTES ***********/

app.get("/", (req, res) => {
    console.log("GET /")

    res.render("index.hbs")
})

app.get("/register.html", (req,res) => {
    console.log("GET /register")

    res.render("register.hbs")
})

app.get("/back", (req,res) => {
    console.log("GET /BACK")

    res.render("index.hbs")
})

app.get("/home", (req, res) => {
    console.log("GET /HOME")

    res.render("home.hbs")
})

app.get("/search", (req, res) => {
    console.log("GET /SEARCH")

    res.render("search.hbs")
})

app.get("/reservations", (req, res) => {
    console.log("GET /RESERVATIONS")

    res.render("reservations.hbs")
})

app.get("/reserve", (req, res) => {
    console.log("GET /labRoom")

    res.render("selectLabRm.hbs")
})

app.get("/lab", (req, res)=>{
    console.log("GET /resDetails")
    
    res.render("reserve.hbs")
})

app.get("/confirm", (req, res)=>{
    console.log("GET /confirmRes")
    
    res.render("conres.hbs")
})

app.post("/add", urlencoder, (req, res) => {
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
            password_error: "Please enter a password"
        })
    } else if(!mail && password && username) {
        res.render("register.hbs", {
            email_error: "Please enter an email"
        })
    } else {
        res.render("register.hbs", {
            big_error: "Incomplete credentials! Please accomplish all fields"
        })
    } 
})

app.post("/select", urlencoder, (req, res) => {
    console.log("POST /select")

    res.render("conres.hbs")
})

app.post("/log", urlencoder, (req,res) => {
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
                        username: doc.username,
                        email: doc.email
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

app.post("/logout", (req, res) => {
    console.log("POST /LOGOUT")

    res.redirect("/")
})

app.get("/notif", (req, res)=>{
    console.log("GET /NOTIF")
    res.render("home.hbs")
})

/***************ADDING***************/

app.post("/store", urlencoder, (req, res)=>{
    console.log("POST /STORE")
    var username = req.body.username
    var email = req.body.email
    var labRm = req.body.labRm
    var seatNo = req.body.seatNo 
    var date = req.body.date
    var startTime = req.body.startTime
    var endTime = req.body.endTime
    
    var dets = new details({
        labRm,
        seatNo, 
        date, 
        startTime, 
        endTime 
    })
    
    dets.save().then((newDets)=>{
        console.log("success")
        res.render("home.hbs", {
            newDets
        })
        
    }, (err)=>{
        console.log("fail " + err)
        res.render("index.hbs")
    })
})

/************** CANCEL **************/

app.post("/cancelRes", urlencoder, (req, res)=>{
    console.log("POST /cancelRes")
    details.remove({
        _id : req.body.id
    }).then(()=>{
        res.redirect("/")
    })
})

/************** LISTEN **************/

app.listen(3000, () => {
    console.log("Listening in port 3000");
})