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
    console.log(req.cookies)


    res.render("index")
})

router.get("/register", function(req, res) {
    console.log("GET /register")
    
    res.render("register.hbs")
})

router.get("/home", function(req, res) {
    console.log("GET /home")

    res.render("home", {
        username: req.query.username
    })
})

router.post("/logout", function(req, res) {
    req.session.destroy

    res.render("index")
})

module.exports = router