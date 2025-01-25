const express = require("express");
const path = require('path');
const app = express();
const cookieParser = require("cookie-parser");

const Routes = require(path.resolve("src","routes","route"));
const ConectDb = require(path.resolve('src','database','connection'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Routes(app);

ConectDb();

app.listen(3003, () => {
    console.log("Connected Server");
  });