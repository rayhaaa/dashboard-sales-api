const express = require('express')
const router = express.Router()
const {getAktualSalesController, getTargetSalesController, getTotalSalesController, eachCustomerController} = require('../controller/salesController')

router.get('/aktualSales', getAktualSalesController)
router.get('/targetSales', getTargetSalesController)
router.get('/totalSales', getTotalSalesController)
router.get('/sales/:eachCustomer', eachCustomerController)

module.exports = router

// router.get('/sales/:customer/:id', (req, res) => {
//     const { customer,id } = req.params
//     res.send(req.params)

//     // console.log(customer)
// })