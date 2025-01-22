const express = require('express');
const path = require("path");
const router = express.Router();
const authMiddleware = require(path.resolve("src","middleware","authMiddleware.js"));
const ClienteController = require(path.resolve("src","controllers","ClienteController.js"));

router.get("/paginaPrincipalCliente",authMiddleware,ClienteController.paginaPrincipal);
router.get("/carrinho",authMiddleware,ClienteController.verCarrinho);
router.get("/finalizarCompra",authMiddleware,ClienteController.finalizarCompra);
router.get("/paginaDaEmpresa",authMiddleware,ClienteController.paginaEmpresa);
router.get("/produtoVer",authMiddleware,ClienteController.verProduto);


module.exports = router;