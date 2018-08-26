const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const mongoose = require("mongoose")
const session = require("express-session")

const app = express()

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/notes", {
  useNewUrlParser:true
})
app.set("view engine", "hbs")
app.use(express.static(__dirname + "/public"))

app.use(require("./controllers"))

app.listen(3000, () => {
    console.log("Listening...");
})