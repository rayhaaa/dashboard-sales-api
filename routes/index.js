const express = require('express')
const router = express.Router()
const {getAktualSalesController, getTargetSalesController, getTotalTargetSalesController} = require('../controller/salesController')

router.get('/aktualSales', getAktualSalesController)
router.get('/targetSales', getTargetSalesController)
router.get('/totalSales', getTotalTargetSalesController)

module.exports = router