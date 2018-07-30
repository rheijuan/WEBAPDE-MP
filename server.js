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
    username: String,
    email: String,
    password: String    
});

const app = express();

const urlencoder = bodyparser.urlencoded({
    extended: false
});

app.use(express.static(__dirname))

app.set("view engine", "hbs")
app.use(express.static(__dirname+"/public"))

app.use(cookieparser());

app.get("/", (req, res, next) => {
    console.log("GET /")

    res.sendFile(path.join(__dirname, "../WEBAPDE-MP1/html/index.html"));
}); 

app.get("/html/register", (req, res, next) => {
    console.log("GET /register")

    res.sendFile(path.join(__dirname, "../WEBAPDE-MP1/html/register.html"))
});

app.post("/html/add", urlencoder, (req, res) => {
    console.log("POST /ADD")

    var username = req.body.username
    var mail = req.body.email
    var password = req.body.identification
    
    if(mail && password && username) {

        User.find({
            username,
            email: mail
        }).then((doc) => {
            if(doc.length == 0) {
                var newUser = new User({
                    username,
                    email: mail,
                    password
                })

                newUser.save().then(() => {
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
    } else if(mail && password && !username) {
        res.redirect("../WEBAPDE-MP1/html/register.html")
    } else if(mail && !password && username) {

    } else if(!mail && password && username){

    } else {
        
    }
});



app.post("/html/log", urlencoder, (req,res) => {
>>>>>>> af01d7d06e1d59673316620f0a01b3c4ced752a6
    console.log("POST /LOG")

    var mail = req.body.email
    var password = req.body.identification

    if(mail && password) {

        res.sendFile(path.join(__dirname, "../WEBAPDE-MP1/html/home.html"))    
    } else if(mail && !password) {

        
    } else if(!mail && password) {

    } else {}
    

})
<<<<<<< HEAD

=======

>>>>>>> c6e55e9701621952afdde1ff0540294e29cf49f4


    
>>>>>>> af01d7d06e1d59673316620f0a01b3c4ced752a6
app.listen(3000, () => {
    console.log("Listening in port 3000");
});