const express = require('express')
require('dotenv').config()
const app = express()
require('./src/config/db')
app.use(express.json())

const userRoutes = require('./src/components/user/user_router')
const companyRoutes = require('./src/components/company/company.router')

app.use('/api/effy/v1', userRoutes)
app.use('/api/effy/v1', companyRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT}`)
})