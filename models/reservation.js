const mongoose = require("mongoose")

var reservationSchema = mongoose.Schema({
    room: Number,
    seat: Number,
    startTime: String,
    endTime: String,
    date: Date,
    occupant: String
})

var Reservation = mongoose.model("reservation", reservationSchema)

exports.create = function(reservation) {
    return new Promise(function(resolve, reject) {
        var u = new Reservation(reservation)

        u.save().then((newReservation) => {
            resolve(newReservation)
        }, (error) => {
            reject(error)
        })
    })
}

exports.get = function(id) {
    return new Promise(function(resolve, reject) {
        User.findOne({_id:id}).then((post) => {
            console.log(reservation)
            resolve(user)
        }, (error) => {
            reject(error)
        })
    })
}

exports.getAll = function() {
    return new Promise(function(resolve, reject) {
        Reservation.find().then((reservations) => {
            resolve(reservations)
        }, (error) => {
            reject(error)
        })
    })
}

exports.edit = function(id, update) {
    return new Promise(function(resolve, reject) {
        Reservation.findByIdAndUpdate({
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