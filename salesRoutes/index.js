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
router.get("/detailCustomer", eachCustomerController);

// router.get(`/:namaCustomer/:itemCode/:targetQty/:aktualQty/:totalTarget/:aktualTarget`,
//   function (req, res) {
//     res.send(req.params);
//     const eachCustomer = req.params;

//     console.log(eachCustomer)
//   },
//   eachCustomerController
// );

// router.get("/:namaCustomer/:itemCode/:targetQty/:aktualQty/:totalTarget/:aktualTarget", function(req , res){
//   sql.connect(sqlConfig, function() {
//   var request = new sql.Request();
//   var stringRequest = "INSERT INTO dbo.NSI_LIVE_USD(namaCustomer, itemCode, targetQty, aktualQty, totaltarget, aktualTarget) VALUES ('"+ req.params.name +"','"+ req.params.category+"','"+ req.params.color+"','"+ req.params.description+"','"+req.params.numberOfUsage+"','"+req.params.size+"','"+req.params.status+"')";
//   console.log(stringRequest)
//   request.query(stringRequest, function(err, recordset) {
//       if(err) console.log(err);
//       res.end(JSON.stringify(recordset)); // Result in JSON format
//       });
//   });
// })


module.exports = router;