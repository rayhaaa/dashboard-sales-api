const express = require("express");
const port = 3000;
const app = express();
const response = require("./response");
const salesRoutes = require("./salesRoutes");
// const productionRoutes = require("./productionRoutes")

app.use(express.json());
app.get("/", (req, res) => {
  response(200, "", "aktual dan target sales api", res);
});

//sales' api
app.use("/api", salesRoutes);

//productions's api
// app.use("/api", productionRoutes)

app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});
