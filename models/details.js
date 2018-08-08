const mongoose = require("mongoose")

var detailsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    labRm: {
        type: Number,
        required: true
    },
    seatNo: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime:{
        type: String, 
        required: true
    },
    endTime: {
         type: String, 
        required: true
    }
})

var details = mongoose.model("details", detailsSchema)

module.exports = {
    details
}