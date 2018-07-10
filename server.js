const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname))

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "../WEBAPDE-MP1/html/start.html"));
});

app.listen(3000, () => {
    console.log("Listening in port 3000");
});