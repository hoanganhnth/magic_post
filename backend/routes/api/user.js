const express = require('express')
const router = express.Router()
const shipmentControllers = require('../../controller/shipmentController')

router.get('/searchShipment', shipmentControllers.searchShipment)
module.exports = router