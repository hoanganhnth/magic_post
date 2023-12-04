const express = require('express')
const router = express.Router()
const accountControllers = require('../../controller/accountController')
const locationControllers = require('../../controller/locationController')
const { auth,isAdmin} = require('../../middleware/auth')

router.post('/registerStaff', auth, accountControllers.registerStaff)
router.get('/allStaff',  isAdmin,  accountControllers.allStaff)
router.get('/allRole', isAdmin, accountControllers.showAllRole)
router.post('/createRole', isAdmin,  accountControllers.createRole)
router.post('/deleteStaff', isAdmin,  accountControllers.deleteStaff)

router.post('/createCollectionPoint', isAdmin,  locationControllers.createCollectionPoint)
router.post('/createTransactionPoint', isAdmin,  locationControllers.createTransactionPoint)
router.get('/getCollectionPoint', isAdmin,  locationControllers.getAllCollectionPoint)
router.get('/getTransactionPoint', isAdmin,  locationControllers.getAllTransactionPoint)
router.post('/deleteTransactionPoint', isAdmin,  locationControllers.deleteTransactionPoint)
router.post('/deleteCollectionPoint', isAdmin,  locationControllers.deleteCollectionPoint)
module.exports = router