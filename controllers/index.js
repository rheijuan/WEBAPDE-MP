const express = require("express")
const router = express.Router()
const app = express()
const User = require("../models/user")
const Reservation = require("../models/reservation")

router.use("/reservation", require("./reservation"))
router.use("/user", require("./user"))

router.get("/", function(req, res) {
    console.log("GET /")
    res.render("index")
})

router.get("/register", function(req, res) {
    console.log("GET /register")
    res.render("register.hbs")
})

router.get("/index", function(req, res) {
    console.log("GET /index")
    res.render("index.hbs")
})

module.exports = router