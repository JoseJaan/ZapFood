const express = require('express');
const path = require("path");
const router = express.Router();
const authMiddleware = require(path.resolve("src","middleware","clienteMiddleware.js"));
const ClienteController = require(path.resolve("src","controllers","ClienteController.js"));
const VendaController = require(path.resolve("src","controllers","VendaController.js"));

router.get("/paginaPrincipalCliente",authMiddleware,ClienteController.paginaPrincipal);
router.get("/carrinho",authMiddleware,ClienteController.verCarrinho);
router.get("/finalizarCompra",authMiddleware,ClienteController.finalizarCompra);
router.get("/paginaDaEmpresa",authMiddleware,ClienteController.paginaEmpresa);
router.get("/produtoVer/:id",authMiddleware,ClienteController.verProduto);
router.post("/finalizarCompra",authMiddleware,VendaController.cadastroVenda);
router.post("/editarPerfil",authMiddleware,ClienteController.editarPerfil);


module.exports = router;