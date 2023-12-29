const express = require('express')
const router = express.Router()
const accountControllers = require('../../controller/accountController')
const locationControllers = require('../../controller/locationController')
const shipmentControllers = require('../../controller/shipmentController')
const { auth,isAdmin, isTransactionStaff, isCollectionHead, isCollectionStaff} = require('../../middleware/auth')

router.post('/registerStaff', auth, accountControllers.registerStaff)
router.get('/getAllStaff',auth,  accountControllers.getAllStaff)
router.delete('/deleteStaff',auth,  accountControllers.deleteStaff)
router.post('/updateStaff',auth,  accountControllers.updateStaff)
router.post('/updatePoint',isAdmin,  shipmentControllers.updatePoint)

router.get('/getAllHead',  isAdmin,  accountControllers.getAllHead)
router.post('/updateUser',  isAdmin,  accountControllers.updateUser)
router.post('/updateHead',  isAdmin,  accountControllers.updateHead)
router.get('/getAllPermission',  isAdmin,  accountControllers.getAllPermission)
router.get('/allRole', isAdmin, accountControllers.showAllRole)
router.post('/createRole', isAdmin,  accountControllers.createRole)


router.post('/createCollectionPoint', isAdmin,  locationControllers.createCollectionPoint)
router.post('/createTransactionPoint', isAdmin,  locationControllers.createTransactionPoint)
router.get('/getCollectionPoint', isAdmin,  locationControllers.getAllCollectionPoint)
router.get('/getTransactionPoint', isAdmin,  locationControllers.getAllTransactionPoint)
router.get('/getAllPoint', isAdmin,  locationControllers.getAllPoint)
router.delete('/deleteTransactionPoint', isAdmin,  locationControllers.deleteTransactionPoint)
router.delete('/deleteCollectionPoint', isAdmin,  locationControllers.deleteCollectionPoint)
router.delete('/deleteShipment', isAdmin,  shipmentControllers.deleteShipment)
router.get('/getShipmentByCollectionPoint', isAdmin,  shipmentControllers.getShipmentByCollectionPoint)
router.get('/getShipmentByTransactionPoint', isAdmin,  shipmentControllers.getShipmentByTransactionPoint)


router.post('/createNewShipment',isTransactionStaff,  shipmentControllers.createNewShipment)
router.delete('/deleteNewShipment',isTransactionStaff,  shipmentControllers.deleteNewShipment)
router.post('/createShipmentFromTPToCP',isTransactionStaff,  shipmentControllers.createShipmentFromTPToCP)
router.get('/getShipmentTransaction',auth,  shipmentControllers.getShipmentTransaction)
router.get('/getShipmentTransactionBystatus',auth,  shipmentControllers.getShipmentTransactionBystatus)
router.post('/confirmShipmentSuOrCa',isTransactionStaff,  shipmentControllers.confirmShipmentSuOrCa)
router.post('/createShipmentToUser',isTransactionStaff,  shipmentControllers.createShipmentToUser)
router.post('/confirmShipmentFromCPToTP',isTransactionStaff,  shipmentControllers.confirmShipmentFromCPToTP)
router.post('/createShipmentCancel',isTransactionStaff,  shipmentControllers.createShipmentCancel)
router.post('/confirmPaided',isTransactionStaff,  shipmentControllers.confirmPaided)



router.post('/createShipmentFromCPToCP',isCollectionStaff,  shipmentControllers.createShipmentFromCPToCP)
router.post('/confirmShipmentFromCPToCP',isCollectionStaff,  shipmentControllers.confirmShipmentFromCPToCP)
router.post('/confirmShipmentFromTPToCP',isCollectionStaff,  shipmentControllers.confirmShipmentFromTPToCP)
router.post('/createShipmentFromCPToTP',isCollectionStaff,  shipmentControllers.createShipmentFromCPToTP)
router.get('/getShipmentCollectionBystatus',auth,  shipmentControllers.getShipmentCollectionBystatus)

router.get('/getShipmentCollection',auth,  shipmentControllers.getShipmentCollection)

module.exports = router