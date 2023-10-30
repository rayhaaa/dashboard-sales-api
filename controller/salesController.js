const {
  getAktualSales,
  getTargetSales,
  getTotalSales,
  getEachCustomer,
  getMikuniIndia,
  getHitachi,
  getAisan,
  getCPM,
  getDMI,
  getHTP,
  getIhara,
  getIKPI,
  getIMC,
  getEpson,
  getTRC,
  getJVC,
  getKawai,
  getKiyokuniIndo,
  getKiyokuniTech,
  getKyoei,
  getKyowa,
  getMikuni,
  getMitsuba,
  getMei,
  getNesinak,
  getOmi,
  getPadma,
  getPatco,
  getShinheung,
  getStandard,
  getTakita,
  getTenma,
  getTjokro,
  getYemi,
  getYimm,
} = require("../database");

const response = require("../response");

const getAktualSalesController = async (req, res) => {
  try {
    let result = await getAktualSales();

    response(200, result, "data aktual sales", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};

const getTargetSalesController = async (req, res) => {
  try {
    let result = await getTargetSales();

    response(200, result, "data target sales", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};

const getTotalSalesController = async (req, res) => {
  try {
    let result = await getTotalSales();

    response(200, result, "data total sales", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};

const eachCustomerController = async (req, res) => {
  try {
    let result = await getEachCustomer();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};

const mikuniIndiaData = async (req, res) => {
  try {
    let result = await getMikuniIndia();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};

const hitachiData = async (req, res) => {
  try {
    let result = await getHitachi();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};

const aisanData = async (req, res) => {
  try {
    let result = await getAisan();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};

const cpmData = async (req, res) => {
  try {
    let result = await getCPM();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const dmiData = async (req, res) => {
  try {
    let result = await getDMI();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const htpData = async (req, res) => {
  try {
    let result = await getHTP();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const iharaData = async (req, res) => {
  try {
    let result = await getIhara();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const ikpiData = async (req, res) => {
  try {
    let result = await getIKPI();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const imcData = async (req, res) => {
  try {
    let result = await getIMC();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const epsonData = async (req, res) => {
  try {
    let result = await getEpson();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const nipponData = async (req, res) => {
  try {
    let result = await getDMI();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const trcData = async (req, res) => {
  try {
    let result = await getTRC();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const jvcData = async (req, res) => {
  try {
    let result = await getJVC();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const kawaiData = async (req, res) => {
  try {
    let result = await getKawai();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const kiyokuniIndoData = async (req, res) => {
  try {
    let result = await getKiyokuniIndo();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const kiyokuniTechData = async (req, res) => {
  try {
    let result = await getKiyokuniTech();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const kyoeiData = async (req, res) => {
  try {
    let result = await getKyoei();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const kyowaData = async (req, res) => {
  try {
    let result = await getKyowa();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const mikuniData = async (req, res) => {
  try {
    let result = await getMikuni();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const mitsubaData = async (req, res) => {
  try {
    let result = await getMitsuba();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const meiData = async (req, res) => {
  try {
    let result = await getMei();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const nesinakData = async (req, res) => {
  try {
    let result = await getNesinak();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const omiData = async (req, res) => {
  try {
    let result = await getOmi();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const padmaData = async (req, res) => {
  try {
    let result = await getPadma();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const patcoData = async (req, res) => {
  try {
    let result = await getPatco();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const shinheungData = async (req, res) => {
  try {
    let result = await getShinheung();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const standardData = async (req, res) => {
  try {
    let result = await getStandard();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const takitaData = async (req, res) => {
  try {
    let result = await getTakita();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const tenmaData = async (req, res) => {
  try {
    let result = await getTenma();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const tjokroData = async (req, res) => {
  try {
    let result = await getTjokro();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const toyotaData = async (req, res) => {
  try {
    let result = await getToyota();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const yemiData = async (req, res) => {
  try {
    let result = await getYemi();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};
const yimmData = async (req, res) => {
  try {
    let result = await getYimm();
    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};

module.exports = {
  getAktualSalesController,
  getTargetSalesController,
  getTotalSalesController,
  eachCustomerController,
  mikuniIndiaData,
  hitachiData,
  aisanData,
  cpmData,
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
  yimmData
};
