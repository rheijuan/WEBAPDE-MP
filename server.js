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

app.post("/html/add", urlencoder, (req, res) => {
    console.log("POST /ADD");

    var mail = req.body.email;
    var password = req.body.identification;
    
    if(mail && password) {

        User.find({
            email: mail
        }).then((doc) => {
            if(doc.length == 0) {
                var newUser = new User({
                    email: mail,
                    password
                })

                newUser.save().then((newdoc) => {
                    console.log("A new user has been added")
                    res.redirect("/")
                }, (error) => {
                    console.log(error)
                })

            } else {
                console.log("Email already in use")
                res.redirect("../html/register.html")
            }
        }, (error) => {
            console.log(error)
        })
    } else 
        res.redirect("../WEBAPDE-MP1/html/register.html")
});

app.listen(3000, () => {
    console.log("Listening in port 3000");
});