const express = require("express");
const path = require('path');
const app = express();

const Routes = require(path.resolve("src","routes","route"));

Routes(app);

app.listen(3003, () => {
    console.log("Connected Server");
  });