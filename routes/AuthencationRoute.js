const express = require('express')
const router = express.Router()
const AuthencationController = require('../controller/AuthencateController')

router.route('/login')
.post(AuthencationController.login)

router.route('/change-default-password/:id')
.post(AuthencationController.changePassword)

module.exports = router