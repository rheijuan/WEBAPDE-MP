const express = require("express")
const router = express.Router()
const Reservation = require("../models/reservation")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.get("/reservations", function(req,res) {
    console.log("GET /reservation/reservations")


    res.render("reservations", {
        username: res.locals.username
    })
})

router.post("/select", function(req,res) {
    console.log("POST /reservation/select")

    res.render("confirm", {
        username: res.locals.username
    })
})

router.get("/back", function(req, res) {
    console.log("GET /reservation/back")

    res.render("home", {
        username: res.locals.username
    })
})

router.post("/reserve", function(req,res) {
    console.log("POST /reservation/reserve")

    res.render("home", {
        username: res.locals.username
    })
})

module.exports = router
