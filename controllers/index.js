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

app.use(session({
    secret : "labressysSecret",
    name : "labressys",
    resave: true,
    saveUninitialized : true,
    cookie: {
        maxAge:1000*60*60*24*7*3,
    }
}))

app.use(cookieparser())

router.get("/", function(req, res) {
    console.log("GET /")
    res.render("index")
})

router.get("/register", function(req, res) {
    console.log("GET /register")
    res.render("register.hbs")
})

module.exports = router