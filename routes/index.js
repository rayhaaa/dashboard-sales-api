const express = require('express')
const router = express.Router()
const getAktualSalesController = require('../controller/salesController')

router.get('/aktualSales', getAktualSalesController)
router.get('/targetSales', )

module.exports = router