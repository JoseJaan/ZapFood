const express = require('express');
const path = require("path");
const router = express.Router();
const authMiddleware = require(path.resolve("src","middleware","lojaMiddleware.js"));
const VendaController= require(path.resolve("src","controllers","VendaController.js"));

router.get("/venda", authMiddleware, VendaController.detalharVenda);
router.get("/venda/:vendaId", authMiddleware); //check
router.get("/venda/listar", authMiddleware)
router.post("/venda/cadastrar", authMiddleware)  //check
router.post("/vendaAtualizar", authMiddleware, VendaController.atualizarVenda)
router.delete("vendas/deletar/:vendaId", authMiddleware)

module.exports = router;