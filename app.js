const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const mongoose = require("mongoose")
const session = require("express-session")
const cookieparser = require("cookie-parser")

const app = express()

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/notes", {
  useNewUrlParser:true
})

app.use(session({
  secret : "labressysSecret",
  name : "labressys",
  resave: true,
  saveUninitialized : true,
  cookie: {
    username: "",
    maxAge: 1000 * 60 * 60 * 24 * 7 * 3,
  }
}))

app.use(cookieparser())

app.set("view engine", "hbs")
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname))

app.use(require("./controllers"))

app.listen(3000, () => {
    console.log("Listening...");
})