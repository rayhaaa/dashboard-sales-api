const {getAktualSales, getTargetSales, getTotalTargetSales} = require("../database");
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

const getTotalTargetSalesController = async (req, res) => {
  try {
    let result = await getTotalTargetSales();

    response(200, result, "data total sales", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};

module.exports = { getAktualSalesController, getTargetSalesController, getTotalTargetSalesController };
