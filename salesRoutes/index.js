const express = require("express");
const router = express.Router();
const {
  getAktualSalesController,
  getTargetSalesController,
  getTotalSalesController,
  eachCustomerController,
} = require("../controller/salesController");

router.get("/aktualSales", getAktualSalesController);
router.get("/targetSales", getTargetSalesController);
router.get("/totalSales", getTotalSalesController);
router.get("/sales", eachCustomerController);

router.get(
  "/:namaCustomer/:itemCode/:quantity/:price/:totalUSD",
  function (req, res) {
    res.send(req.params);

    // let name = req.params.namaCustomer;
    // let itemCode = req.params.itemCode;
    // let qty = req.params.quantity;
    // let price = req.params.price;
    // let totalUSD = req.params.totalUSD;
    // console.log(`namaCustomer : ${name}`);
    // console.log(`itemCode : ${itemCode}`);
    // console.log(`quantity : ${qty}`);
    // console.log(`price per part : ${price}`);
    // console.log(`total sales (in USD) : ${totalUSD}`);

    const eachCustomer = req.params;
    console.log(eachCustomer);
  },
  eachCustomerController
);

module.exports = router;
