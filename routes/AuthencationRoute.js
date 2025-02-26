const express = require('express')
const router = express.Router()
const AuthencationController = require('../controller/AuthencateController')

router.route('/login')
.post(AuthencationController.login)

router.route('/change-default-password/:id')
.post(AuthencationController.changePassword)

router.route('/forgot-password')
.post(AuthencationController.forgotPassword)

module.exports = router