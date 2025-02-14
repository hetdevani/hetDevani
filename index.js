const express = require("express");
const app = express();
require("dotenv").config({ path: ".env" });
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.mongoDb_url).then(() => {
  console.log("mongodb connected !!");
});

app.use(cors());
const route = require("./route/index.route");
app.use(route);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server start on port : ${port}`);
});

module.exports = app;
