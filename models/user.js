const mongoose = require("mongoose")

var userSchema = mongoose.Schema({
    id: Number,
    username: String,
    email: String,
    password: String,
    reservations: [] // can be replaced with the reservationSchema
})

var User = mongoose.model("user", userSchema)

exports.create = function(user) {
    return new Promise(function(resolve, reject) {
        var u = new User(user)

        u.save().then((newUser) => {
            resolve(newUser)
        }, (error) => {
            reject(error)
        })
    })
}

exports.get = function(id) {
    return new Promise(function(resolve, reject) {
        User.findOne({_id:id}).then((post) => {
            console.log(user)
            resolve(user)
        }, (error) => {
            reject(error)
        })
    })
}

exports.getAll = function() {
    return new Promise(function(resolve, reject) {
        User.find().then((users) => {
            resolve(users)
        }, (error) => {
            reject(error)
        })
    })
}

exports.edit = function(id, update) {
    return new Promise(function(resolve, reject) {
        User.findByIdAndUpdate({
            _id: id
        }, update, {
            new: true
        }).then((newUser) => {
            resolve(newUser)
        }, (error) => {
            reject(error)
        })
    })
}

exports.delete = function(id) {
    return new Promise(function(resolve, reject) {
        User.remove({
            _id: id
        }).then((result) => {
            resolve(result)
        }, (error) => {
            reject(error)
        })
    })
}