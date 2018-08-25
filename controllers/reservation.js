const express = require("express")
const router = express.Router()
const Reservation = require("../models/reservation")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

module.exports = router
