const express = require('express')
const router = express.Router()
const accountControllers = require('../../controller/accountController')
const locationControllers = require('../../controller/locationController')
const shipmentControllers = require('../../controller/shipmentController')
const { auth,isAdmin, isTransactionStaff} = require('../../middleware/auth')

router.post('/registerStaff', auth, accountControllers.registerStaff)
router.get('/getAllHead',  isAdmin,  accountControllers.getAllHead)

router.get('/getAllPermission',  isAdmin,  accountControllers.getAllPermission)
router.get('/allRole', isAdmin, accountControllers.showAllRole)
router.post('/createRole', isAdmin,  accountControllers.createRole)
router.delete('/deleteStaff', isAdmin,  accountControllers.deleteStaff)

router.post('/createCollectionPoint', isAdmin,  locationControllers.createCollectionPoint)
router.post('/createTransactionPoint', isAdmin,  locationControllers.createTransactionPoint)
router.get('/getCollectionPoint', isAdmin,  locationControllers.getAllCollectionPoint)
router.get('/getTransactionPoint', isAdmin,  locationControllers.getAllTransactionPoint)
router.delete('/deleteTransactionPoint', isAdmin,  locationControllers.deleteTransactionPoint)
router.delete('/deleteCollectionPoint', isAdmin,  locationControllers.deleteCollectionPoint)

router.get('/getAllStaff',auth,  accountControllers.getAllStaff)
router.post('/createNewShipment',isTransactionStaff,  shipmentControllers.createNewShipment)
router.delete('/deleteNewShipment',isTransactionStaff,  shipmentControllers.deleteNewShipment)
module.exports = router