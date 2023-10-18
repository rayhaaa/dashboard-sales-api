const response = (statusCode, data, message, res) => {
  if (data == 0) {
      data = [
          {
              date: null,
              namaCustomer: null,
              partNumber: null,
              quantity: null,
              price: null,
              totalUSD: null,
            },
        ];
  }
  res.status(statusCode).json({
      payload: {
          status_code: statusCode,
          data: data,
          message: message,
        },
    });
};

module.exports = response;