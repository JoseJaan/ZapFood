const express = require('express');
const path = require("path");
const router = express.Router();
const authMiddleware = require(path.resolve("src","middleware","authMiddleware.js"));
const LojaController = require(path.resolve("src","controllers","LojaController.js"));

router.get("/loja", LojaController.detalharLoja);
router.get("/loja/detalhar",authMiddleware,LojaController.obterLoja);

module.exports = router;