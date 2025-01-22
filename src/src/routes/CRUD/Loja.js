const express = require('express');
const path = require("path");
const router = express.Router();
const authMiddleware = require(path.resolve("src","middleware","lojaMiddleware.js"));
const LojaController = require(path.resolve("src","controllers","LojaController.js"));

router.get("/loja", authMiddleware,LojaController.detalharLoja);
router.get("/loja/detalhar",authMiddleware,LojaController.obterLoja);
router.get("/paginaPrincipalLoja",authMiddleware,LojaController.paginaPrincipal);

module.exports = router;