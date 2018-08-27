const express = require("express")
const router = express.Router()
const app = express()
const User = require("../models/user")
const Reservation = require("../models/reservation")

router.use("/reservation", require("./reservation"))
router.use("/user", require("./user"))

router.use("/", (req,res, next) => {

    if(req.cookies.username) 
        res.locals.username = req.cookies.username

    next()
})

router.get("/", function(req, res) {
    console.log("GET /")

    if(res.locals.username) {
        res.render("home", {
            username: res.locals.username
        })
    } else 
        res.render("index")
})

router.get("/register", function(req, res) {
    console.log("GET /register")
    res.render("register.hbs")
})

router.get("/home", function(req, res) {
    console.log("GET /home")
    
    res.render("home", {
        username: res.locals.username
    })
})

router.post("/logout", function(req, res) {
    res.render("index")
})

module.exports = router