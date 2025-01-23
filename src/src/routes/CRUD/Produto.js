const express = require('express');
const path = require("path");
const router = express.Router();
const produtoController = require(path.resolve("src","controllers","ProdutoController.js"));
const authMiddleware = require(path.resolve("src","middleware","lojaMiddleware.js"));
const upload = require(path.resolve("config","multer"));

router.get("/produto", authMiddleware,produtoController.cadastrarProduto);
router.post("/produto/cadastro", authMiddleware, upload.single('file-id'), produtoController.cadastro);
router.get("/produtos", authMiddleware, produtoController.listarProdutos);
router.get("/produto/detalhar/:id", authMiddleware, produtoController.obterProduto);
router.put("/produto/atualizar/:id", upload.single('foto'), authMiddleware, produtoController.atualizarProduto);
router.delete("/produto/remover/:id", authMiddleware, produtoController.excluirProduto);

module.exports = router;