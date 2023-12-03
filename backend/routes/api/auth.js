const express = require('express')
const router = express.Router()
const authControllers = require('../../controller/authController')
const {auth} = require('../../middleware/auth')

router.post('/registerAdmin', authControllers.registerAdmin)

router.post('/login', authControllers.login)

router.post('/logout', authControllers.logout)

router.post('/refresh', authControllers.refresh)

router.get('/user', auth ,  authControllers.user)



module.exports = router