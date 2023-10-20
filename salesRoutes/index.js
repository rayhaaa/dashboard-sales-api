const express = require('express')
const router = express.Router()
const {getAktualSalesController, getTargetSalesController, getTotalSalesController} = require('../controller/salesController')

router.get('/aktualSales', getAktualSalesController)
router.get('/targetSales', getTargetSalesController)
router.get('/totalSales', getTotalSalesController)

module.exports = router