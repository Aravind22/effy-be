const mongoose = require('mongoose')
require('dotenv').config()

const DB_PATH = process.env.DB_PATH
mongoose.set('strictQuery', true)
try{
    mongoose.connect(DB_PATH)
    .then(() => {
        console.log("Database connection up and running...")
    })
    .catch((err) => {
        console.log("Error in connecting DB: ", err)

    })
}catch(error){
    console.log("Error in DB Connection")
}