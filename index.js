const express = require("express");
const port = 3000;
const app = express();
const response = require("./response");
const routes = require("./routes");

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  response(200, "", "aktual dan target sales api", res);
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});
