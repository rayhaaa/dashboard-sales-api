const express = require("express");
const port = 3000;
const cors = require("cors");
const app = express();
const response = require("./response");
const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  response(200, "", "sales api", res);
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});
