const getAktualSales = require('../database')
const response = require('../response')

const getAktualSalesController = async (req, res) => {
    try{
        let result = await getAktualSales

        response(200, result, 'data aktual sales', res)
    }catch (error){
        console.log(error)
        response(500, error, 'server error', res)
    }
}

// const getTargetSalesController = async (req, res) => {
//     try{
//         var result = await getTargetSales()

//         response(200, result, 'data sales', res)
//     }catch (error){
//         console.log(error)
//         response(500, error, 'server error', res)
//     }
// }


module.exports = getAktualSalesController