const {
  getAktualSales,
  getTargetSales,
  getTotalSales,
  getEachCustomer,
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

const  eachCustomerController = async (req, res) => {
  const eachCustomer = req.params
  res.send(req.params);

  console.log(eachCustomer);

  try {
    let result = await getEachCustomer();

    response(200, result, "data tiap kastamer", res);
  } catch (error) {
    console.log(error);
    response(500, error, "server error", res);
  }
};

// const eachCustomerController = async (req, res) => {
// try{
//   let result = await getEachCustomer();
//   const { customer } = req.params
//   res.send(req.params)

//   console.log(customer)
//   response(200, result, "data tiap kastamer", res)
//   }catch (error){
//     console.log(error)
//     response(500, error, "server error", res)
//   }
// }

module.exports = {
  getAktualSalesController,
  getTargetSalesController,
  getTotalSalesController,
  eachCustomerController,
};
