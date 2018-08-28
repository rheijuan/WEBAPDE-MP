const mongoose = require("mongoose")

var reservationSchema = mongoose.Schema({
    room: Number,
    seat: Number,
    startTime: Number,
    endTime: Number,
    date: String,
    occupant: String
})

var Reservation = mongoose.model("reservation", reservationSchema)

exports.create = function(reservation) {
    return new Promise(function(resolve, reject) {
        var r = new Reservation(reservation)

        r.save().then((newReservation) => {
            resolve(newReservation)
        }, (error) => {
            reject(error)
        })
    })
}

exports.get = function(id) {
    return new Promise(function(resolve, reject) {
        Reservation.findOne({_id:id}).then((post) => {
            console.log(reservation)
            resolve(reservation)
        }, (error) => {
            reject(error)
        })
    })
}

exports.getAllOccupant = function() {
    return new Promise(function(resolve, reject) {
        Reservation.find().then((reservations) => {
            resolve(reservations)
        }, (error) => {
            reject(error)
        })
    })
}

exports.getAll = function(occupant){
    return new Promise(function(resolve, reject){
        Reservation.find({occupant}).then((reservations)=>{
            resolve(reservations)
        }, (error)=>{
            reject(error)
        })
    })
}

exports.edit = function(id, update) {
    return new Promise(function(resolve, reject) {
        Reservation.findOneAndUpdate({
            _id: id
        }, update, {
            new: true
        }).then((newReservation) => {
            resolve(newReservation)
        }, (error) => {
            reject(error)
        })
    })
}
/*
exports.edit = function(id, room, seat, startTime, endTime, date){
    return new Promise(function(resolve, reject){
          Reservation.findOneAndUpdate({
            _id: id
        }, {
            room, seat, startTime, endTime, date
          }).then((newReservation) => {
            resolve(newReservation)
        }, (error) => {
            reject(error)
        })
    })
}*/

exports.delete = function(id) {
    return new Promise(function(resolve, reject) {
        Reservation.remove({
            _id: id
        }).then((result) => {
            resolve(result)
        }, (error) => {
            reject(error)
        })
    })
}