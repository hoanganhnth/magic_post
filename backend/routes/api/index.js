const express = require('express')
const router = express.Router()
const accountControllers = require('../../controller/accountController')
const { auth,isAdmin} = require('../../middleware/auth')

router.post('/registerStaff',isAdmin, accountControllers.registerStaff)
router.get('/allStaff',  isAdmin,  accountControllers.allStaff)
router.get('/allRole', isAdmin, accountControllers.showAllRole)
router.post('/createRole', isAdmin,  accountControllers.createRole)
router.post('/deleteStaff', isAdmin,  accountControllers.deleteStaff)

module.exports = router