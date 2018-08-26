const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/Users", {
    useNewUrlParser: true
});

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    reservations: [],
    validated: {
        type: Boolean,
        defaulValue: false
    },
    isAdmin: {
        type: Boolean,
        defaulValue: false
    },
    verification: Number
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

exports.findByEmail = function(email) {
    return new Promise(function(resolve, reject) {
        User.findOne({email}).then((user) => {
            resolve(user)
        }, (error) => {
            reject(error)
        })
    })
}

exports.findAccountToVerify = function(verification) {
    return new Promise(function(resolve, reject) {
        User.find({verification}).then((users) => {
            resolve(users)
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

exports.validateAccount = function(id, update) {
    return new Promise(function(resolve, reject) {
        User.findOneAndUpdate({
            _id: id,
            validated: true
        }).then((updatedUser) => {
           resolve(updatedUser)
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