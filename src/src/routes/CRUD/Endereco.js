const express = require('express');
const path = require("path");
const router = express.Router();
const authMiddleware = require(path.resolve("src","middleware","authMiddleware.js"));
const LojaController = require(path.resolve("src","controllers","EnderecoController.js"));

router.get("/endereco", LojaController.detalharLoja);
router.post("/endereco/cadastrar",authMiddleware,LojaController.obterLoja);
router.put("/endereco/editar/:idEndereco",authMiddleware,LojaController.obterLoja);
router.delete("/endereco/excluir/:idEndereco",authMiddleware,LojaController.obterLoja);
router.get("/endereco/listar",authMiddleware,LojaController.obterLoja);
router.get("/endereco/detalhar/:idEndereco",authMiddleware,LojaController.obterLoja);

module.exports = router;