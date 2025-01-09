const express = require("express");
const path = require('path');
const app = express();

const Routes = require(path.resolve("src","routes","route"));
const ConectDb = require(path.resolve('src','database','connection'));

Routes(app);

ConectDb();

app.listen(3003, () => {
    console.log("Connected Server");
  });