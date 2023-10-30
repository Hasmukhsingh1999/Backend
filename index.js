const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const router = require("./routes/index");
require('./models/db').connectDataBase()

app.use(cors());
app.use(logger("tiny"));
app.use(bodyParser.json());

app.use("/", router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
