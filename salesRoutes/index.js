const express = require("express");
const router = express.Router();
const {
  getAktualSalesController,
  getTargetSalesController,
  getTotalSalesController,
  eachCustomerController,
  mikuniIndiaData,
  hitachiData,
  cpmData,
  aisanData,
  dmiData,
  htpData,
  iharaData,
  ikpiData,
  imcData,
  epsonData,
  nipponData,
  trcData,
  jvcData,
  kawaiData,
  kiyokuniIndoData,
  kiyokuniTechData,
  kyoeiData,
  kyowaData,
  mikuniData,
  mitsubaData,
  meiData,
  nesinakData,
  omiData,
  padmaData,
  patcoData,
  shinheungData,
  standardData,
  takitaData,
  tenmaData,
  tjokroData,
  toyotaData,
  yemiData,
  yimmData,
} = require("../controller/salesController");

router.get("/aktualSales", getAktualSalesController);
router.get("/targetSales", getTargetSalesController);
router.get("/totalSales", getTotalSalesController);
router.get("/detailCustomer", eachCustomerController);
router.get("/get-mikuni-india", mikuniIndiaData);
router.get("/get-hitachi", hitachiData);
router.get("/get-aisan", aisanData);
router.get("/get-cpm", cpmData);
router.get("/get-dmi", dmiData);
router.get("/get-htp", htpData)
router.get("/get-ihara", iharaData)
router.get("/get-ikpi", ikpiData)
router.get("/get-imc", imcData)
router.get("/get-epson", epsonData)
router.get("/get-nippon", nipponData)
router.get("/get-trc", trcData)
router.get("/get-jvc", jvcData)
router.get("/get-kawai-nip", kawaiData)
router.get("/get-kiyokuni-indo", kiyokuniIndoData)
router.get("/get-kiyokuni-tech", kiyokuniTechData)
router.get("/get-kyoei", kyoeiData)
router.get("/get-kyowa", kyowaData)
router.get("/get-mikuni", mikuniData)
router.get("/get-mitsuba", mitsubaData)
router.get("/get-mei", meiData)
router.get("/get-nesinak", nesinakData)
router.get("/get-omi", omiData)
router.get("/get-padma", padmaData)
router.get("/get-patco", patcoData)
router.get("/get-shinheung", shinheungData)
router.get("/get-standard", standardData)
router.get("/get-takita", takitaData)
router.get("/get-tenma", tenmaData)
router.get("/get-tjokro", tjokroData)
router.get("/get-toyota", toyotaData)
router.get("/get-yemi", yemiData)
router.get("/get-yimm", yimmData)

module.exports = router;

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

