const express = require("express");
const router = express.Router()
const companyController = require('./company.controller')

router.post('/company', companyController.createCompany)
router.get('/company', companyController.listAllCompany)
router.get('/company/:id', companyController.getCompanyByID)
router.delete('/company/:id', companyController.deleteCompany)

module.exports = router