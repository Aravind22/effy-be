const express = require("express");
const router = express.Router()
const userController = require('./user.controller')

router.post('/user', userController.createUser)
router.get('/user', userController.listAllUser)
router.get('/user/:id', userController.findOneUser)
router.put('/user', userController.updateUser)
router.post('/user/deactivate/:id', userController.deactivateUser)
router.delete('/user/:id', userController.deleteUser)

module.exports = router