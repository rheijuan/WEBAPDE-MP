const express = require("express");
const hbs = require("hbs");
const bodyparser = require("body-parser");
const session = require("express-session");
const path = require("path");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/UserList", {
    useNewUrlParser: true
});

var User = mongoose.model("user", {
    email: String,
    password: String
});

const app = express();

const urlencoder = bodyparser.urlencoded({
    extended: false
});

app.use(express.static(__dirname));

app.set("view engine", "hbs");
app.use(express.static(__dirname+"/public"));

app.use(cookieparser());

app.get("/", (req, res, next) => {
    console.log("GET /");

    res.sendFile(path.join(__dirname, "../WEBAPDE-MP1/html/index.html"));
}); 

app.get("/html/register", (req, res, next) => {
    console.log("GET /register");

    res.sendFile(path.join(__dirname, "../WEBAPDE-MP1/html/register.html"));
});

app.post("/add", urlencoder, (req, res) => {
    console.log("POST /ADD");

    var email = req.body.email;
    var password = req.body.identification;
    
    if(email && password) {
        User.findOne({
            email: email
        }).then(() => {
            var newUser = new User({
                email,
                password
            })
            newUser.save().then((newdoc) => {
                console.log("Item has been added: " + newdoc)
                res.redirect("/")
            }, (error) => {
                console.log("Username is in use")
                console.log(error)
                res.redirect("../WEBAPDE-MP1/html/register.html")
            })
            console.log("hello")
        }, () => {
            console.log("mamamo")
            res.redirect("../WEBAPDE-MP1/html/register.html")
        })

    }
});

app.listen(3000, () => {
    console.log("Listening in port 3000");
});