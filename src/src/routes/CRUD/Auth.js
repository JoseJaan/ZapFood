const express = require('express');
const path = require("path");
const routes = express.Router();
const AuthController = require(path.resolve("src","controllers","AuthController"));

routes.get("/login",AuthController.fazerLogin);

routes.get("/registroCliente",AuthController.registroCliente);

module.exports = routes;