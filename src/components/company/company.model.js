const mongoose = require('mongoose')
// const userSchema = require('../user/user.model')

const companySchema = new mongoose.Schema({
    "Name": String,
    "Address": String,
    "loc": {
        type:{type:String},
        Coordinates:[Number]
    },
    "users": [{type: mongoose.Schema.Types.ObjectId, ref: 'userSchema'}]
})

module.exports = mongoose.model('company', companySchema)
