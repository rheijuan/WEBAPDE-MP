/** This file contains the functions 
 * to the CRUD operations of the 2 databases**/
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/UserList", {
    useNewUrlParser: true
});

mongoose.connect("mongodb://localhost:27017/ReservationList", {
    useNewUrlParser: true
});

var User = mongoose.model("user", {
    id: Number,
    username: String,
    email: String,
    password: String,
    reservations: Array
});

var Reservation = mongoose.model("reservation", {
    room: Number,
    seat: Number,
    startTime: String,
    endTime: String,
    date: Date,
    user_id: Number
})

/** USER DATABASE **/

// CREATE
function addUser(user) {
    user.save().then((doc) => {
        console.log("Successfully added: " + doc)
    }, (error) => {
        console.log(error)
    })
}

// READ
function findUser(id) {
    User.find({
        id,
    }).then((users) => {
        console.log(users)
    }, (error) => {
        console.log(error)
    })
}

// UPDATE
function updateUser(id, update) {
    User.findOneAndUpdate({
        id,
        username: update,
    }).then((updatedUser) => {
        console.log("Updated user: " + JSON.stringify(updatedUser))
    }, (error) => {
        console.log(error)
    })
}

// DELETE
function deleteUser(id) {
    User.deleteOne({
        id,
    }).then((user) => {
        console.log("Deleted " + user.username + " user")
    }, (error) => {
        console.log(error)
    })
}


/** RESERVATION DATABASE **/
// CREATE
function addReservation(reservation) {
    reservation.save().then((doc) => {
        console.log("Successfully added " + doc)
    }, (error) => {
        console.log(error)
    })
}

// READ
function findReservation(id) {
    Reservation.find({
        _id: id,
    }).then((reservations) => {
        console.log(reservations)
    }, (error) => {
        console.log(error)
    })
}

// UPDATE
function updateReservation(id, update) {
    Reservation.findOneAndUpdate({
        _id: id,
        room: update,
    }).then((updatedReservation) => {
        console.log("Updated user: " + JSON.stringify(updatedReservation))
    }, (error) => {
        console.log(error)
    })
}

// DELETE
function deleteReservation(id) {
    Reservation.deleteOne({
        _id: id,
    }).then((reservation) => {
        console.log("Deleted reservation " + reservation)
    }, (error) => {
        console.log(error)
    })
}