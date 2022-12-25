var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    "FirstName":String,
    "LastName": String,
    "Email": String,
    "Designation":String,
    "DOB": Date,
    "Active": Boolean
})

module.exports = mongoose.model('user', userSchema)