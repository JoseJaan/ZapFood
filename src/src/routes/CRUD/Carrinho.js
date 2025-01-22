const express = require('express');
const path = require("path");
const router = express.Router();
const authMiddleware = require(path.resolve("src","middleware","clienteMiddleware.js"));
const CarrinhoController = require(path.resolve("src","controllers","CarrinhoController.js"));

router.get("/verCarrinho",authMiddleware,CarrinhoController.verCarrinho);
router.post("/adicionarAoCarrinho",authMiddleware,CarrinhoController.adicionarAoCarrinho);
router.post('/excluirProdutoCarrinho',authMiddleware,CarrinhoController.excluirProdutoCarrinho);

module.exports = router;