const express = require('express');
const path = require("path");
const router = express.Router();
const clienteMiddleware = require(path.resolve("src","middleware","clienteMiddleware.js"));
const lojaMiddleware = require(path.resolve("src","middleware","lojaMiddleware.js"));
const LojaController = require(path.resolve("src","controllers","LojaController.js"));

router.get("/empresa/:idLoja",clienteMiddleware, LojaController.buscarLoja);
router.get("/loja", lojaMiddleware, LojaController.detalharLoja);
router.get("/loja/detalhar", clienteMiddleware, LojaController.obterLoja);
router.get("/paginaPrincipalLoja", lojaMiddleware, LojaController.paginaPrincipal);
router.post("/mudarImagemLoja",upload.single('image'),lojaMiddleware,LojaController.mudarImagem);


module.exports = router;