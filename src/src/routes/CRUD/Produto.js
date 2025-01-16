const express = require('express');
const path = require("path");
const router = express.Router();
const produtoController = require(path.resolve("src","controllers","ProdutoController.js"));
const authMiddleware = require(path.resolve("src","middleware","authMiddleware.js"));
const upload = require(path.resolve("config","multer"));

router.get("/produto", produtoController.cadastrarProduto);
router.post("/cadastro", upload.single('foto'), authMiddleware, produtoController.cadastro);
router.get("/produtos", authMiddleware, produtoController.listarProdutos);
router.get("/produto/:id", produtoController.obterProduto);
router.put("/produto/:id", upload.single('foto'), authMiddleware, produtoController.atualizarProduto);
router.delete("/produto/:id", authMiddleware, produtoController.excluirProduto);

module.exports = router;