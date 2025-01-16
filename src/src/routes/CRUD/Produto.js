const express = require('express');
const path = require("path");
const routes = express.Router();
const produtoController = require(path.resolve("src","controllers","ProdutoController.js"));
const authMiddleware = require(path.resolve("src","middleware","authMiddleware.js"));

routes.post("/cadastro", authMiddleware, produtoController.cadastro);
routes.put("/produto/:id", authMiddleware, produtoController.atualizarProduto);
routes.delete("/produto/:id", authMiddleware, produtoController.excluirProduto);


module.exports = routes;