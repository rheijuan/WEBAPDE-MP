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
    username: String,
    email: String,
    password: String,
    
});

var Reservation = mongoose.model("reservation", {
    startTimeHour: Number,
    startTimeMin: Number,
    endTimeHour: Number,
    endTimeMin: Number,

})

/** USER DATABASE **/

/** RESERVATION DATABASE **/

    
=======
// CREATE
User.save().then((user) => {
    console.log("Successfully added: " + user)
}, (error) => {
    console.log(error)
})

// READ
User.find({
    email,
}).then((users) => {
    console.log(users)
}, (error) => {
    console.log(error)
})

// UPDATE
User.findOneAndUpdate({
    email,
}).then((updatedUser) => {
    console.log("Updated user: " + JSON.stringify(updatedUser))
}, (error) => {
    console.log(error)
})

// DELETE
User.deleteOne({
    email,
}).then((user) => {
    console.log("Deleted " + user.username + " user")
}, (error) => {
    console.log(error)
})

/** RESERVATION DATABASE **/
// CREATE
Reservation.save().then((reservation) => {
    console.log("Successfully added: " + reservation)
}, (error) => {
    console.log(error)
})

// READ
Reservation.find({
    _id: "",
}).then((reservations) => {
    console.log(reservations)
}, (error) => {
    console.log(error)
})

// UPDATE
Reservation.findOneAndUpdate({
    _id: "",
}).then((updatedReservation) => {
    console.log("Updated user: " + JSON.stringify(updatedReservation))
}, (error) => {
    console.log(error)
})

// DELETE
Reservation.deleteOne({
    _id: "",
}).then((reservation) => {
    console.log("Deleted reservation of user" + reservation.startTimeHour)
}, (error) => {
    console.log(error)
})
