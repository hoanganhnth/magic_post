const express = require('express')
const router = express.Router()
const accountControllers = require('../../controller/accountController')
const locationControllers = require('../../controller/locationController')
const shipmentControllers = require('../../controller/shipmentController')
const { auth,isAdmin, isTransactionStaff, isCollectionHead, isCollectionStaff} = require('../../middleware/auth')

router.post('/registerStaff', auth, accountControllers.registerStaff)
router.get('/getAllStaff',auth,  accountControllers.getAllStaff)

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
router.delete('/deleteShipment', isAdmin,  shipmentControllers.deleteShipment)


router.post('/createNewShipment',isTransactionStaff,  shipmentControllers.createNewShipment)
router.delete('/deleteNewShipment',isTransactionStaff,  shipmentControllers.deleteNewShipment)
router.post('/createShipmentFromTPToCP',isTransactionStaff,  shipmentControllers.createShipmentFromTPToCP)
router.get('/getAllShipmentTran',isTransactionStaff,  shipmentControllers.getAllShipmentTran)
router.post('/confirmShipmentSuOrCa',isTransactionStaff,  shipmentControllers.confirmShipmentSuOrCa)
router.post('/createShipmentToUser',isTransactionStaff,  shipmentControllers.createShipmentToUser)
router.post('/confirmShipmentFromCPToTP',isTransactionStaff,  shipmentControllers.confirmShipmentFromCPToTP)


router.post('/createShipmentFromCPToCP',isCollectionStaff,  shipmentControllers.createShipmentFromCPToCP)
router.post('/confirmShipmentFromCPToCP',isCollectionStaff,  shipmentControllers.confirmShipmentFromCPToCP)
router.post('/confirmShipmentFromTPToCP',isCollectionStaff,  shipmentControllers.confirmShipmentFromTPToCP)
router.post('/createShipmentFromCPToTP',isCollectionStaff,  shipmentControllers.createShipmentFromCPToTP)





module.exports = router