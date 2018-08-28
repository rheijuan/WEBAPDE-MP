const express = require("express")
const router = express.Router()
const Reservation = require("../models/reservation")
const User = require("../models/user")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.get("/reservations", urlencoder, function(req,res) {
    console.log("GET /reservation/reservations")
    
    var username = req.query.username
    console.log("username: "+ username)
    
    Reservation.getAll(username).then((reservations)=>{
        res.render("reservations", {
            username,
            reservations
        })
    }, (error)=>{
        res.send(error)
    })
})

router.post("/delete", urlencoder, function(req, res){
    console.log("POST /reservations/delete")
    
    var username = req.query.username
    var id = req.query.id
    
    console.log("id: " + id + "username: "+ username )
    
    Reservation.delete(id).then((reservations)=>{
        
        res.render("reservations", {
            username,
            reservations
        })
    }, (error)=>{
        res.send(error)
    })
})


router.get("/edit", urlencoder, function(req, res){
    console.log("POST /reservation/edit")
    
    var username = req.query.username
    var id = req.query.id
    
    console.log("id: " + id + "username: "+username)
    
    Reservation.edit(id, room, seat, startTime, endTime, date).then((id)=>{
        res.render("home", {
            username, 
            id
        })
    }, (error)=>{
        res.send(error)
    })
})

router.post("/select", urlencoder, function(req,res) {
    console.log("POST /reservation/select")

    var Username = req.body.Username
    var Floor = req.body.Floor
    var Date = req.body.Date
    var SeatNumber = req.body.SeatNumber
    var StartTime = req.body.StartTime
    var EndTime = req.body.EndTime

    console.log("Username: " + Username)
    console.log("Floor: " + Floor)
    console.log("Date: " + Date)
    console.log("Seat: " + SeatNumber)
    console.log("Start Time: " + StartTime)
    console.log("End Time: " + EndTime)

    User.findByUsername(Username).then((user)=> {
        res.render("confirm", {
            user, username: Username, Floor, Date, 
            SeatNumber, StartTime, EndTime
        })
    }, (err)=> {
        res.send(err)
    })
})



router.get("/back", function(req, res) {
    console.log("GET /reservation/back")

    res.render("home", {
        username
    })
})

router.post("/reserve", urlencoder, function(req,res) {
    console.log("POST /reservation/reserve")

    var username = req.body.Username
    var room = req.body.Floor
    var date = req.body.Date
    var seat = req.body.SeatNumber
    var startTime = req.body.StartTime
    var endTime = req.body.EndTime

    var slot = {
        room, seat, startTime, endTime,
        date, occupant: username
    }

    Reservation.create(slot).then((newSlot)=> {
        res.render("home", {
            username
        })
    }, (err)=> {
        res.send(err)
    })
})


router.get("/getslots", (req, res)=> {
    console.log("POST /reservation/getslots")


    Reservation.getAll().then((slots)=> {
        console.log(slots)
        res.send(slots)
    }, (err)=> {
        res.send(err)
    })
})

/***** FOR TESTING PURPOSES ONLY *****/
router.post("/addslot", urlencoder, (req, res)=> {
    console.log("POST /addslot")

    var room = req.body.selectedFloor
    var seat = req.body.compNumber
    var date = req.body.date
    var startTime = req.body.startTime
    var endTime = req.body.endTime

    console.log("Selected Room: " + room)
    console.log("Computer Number: " + seat)
    console.log("Date: " + date)
    console.log("Start Time: " + startTime)
    console.log("End Time: " + endTime)

    var slot = {
        room, seat, startTime, endTime,
        date, occupant: "Add Tester"
    }

    Reservation.create(slot).then((newSlot)=> {
        res.send(newSlot)
    }, (err)=> {
        res.send(err)
    })
})


module.exports = router
