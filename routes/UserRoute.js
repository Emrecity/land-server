const express = require('express')
const UserController = require('../controller/UserController')

const router = express.Router()

router.route('/')
.get(UserController.getAllUsers)
.post(UserController.createUser)

router.route('/stats')
.get(UserController.getStats)

router.route('/:id')
.put(UserController.updateUser)

.get(UserController.getOneUser)

.delete(UserController.deleteUser)


module.exports = router