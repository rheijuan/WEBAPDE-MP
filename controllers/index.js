const express = require("express")
const router = express.Router()
const app = express()
const User = require("../models/user")
const Reservation = require("../models/reservation")
const session = require("express-session")
const path = require("path")
const cookieparser = require("cookie-parser")

router.use("/reservation", require("./reservation"))
router.use("/user", require("./user"))

// router.use("/", (req,res, next) => {

//     if(req.cookies.username) 
//         res.locals.username = req.cookies.username

//     next()
// })

router.get("/", function(req, res) {
    console.log("GET /")
    console.log(req.cookies.username)
    console.log(req.user)

    res.render("index")
})

router.get("/register", function(req, res) {
    console.log("GET /register")
    console.log(req.cookies.username)

    res.render("register.hbs")
})

router.get("/home", function(req, res) {
    console.log("GET /home")
    console.log(req.cookies.username)
    console.log(req.user)

    res.render("home", {
        username: req.cookies.username
    })
})

router.post("/logout", function(req, res) {
    req.session.destroy

    res.render("index")
})

module.exports = router