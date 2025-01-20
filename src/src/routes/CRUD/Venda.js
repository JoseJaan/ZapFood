const express = require('express');
const path = require("path");
const router = express.Router();
const authMiddleware = require(path.resolve("src","middleware","authMiddleware.js"));
const LojaController = require(path.resolve("src","controllers","VendaController.js"));

router.get("/venda", );
router.get("/venda/:vendaId", authMiddleware); //check
router.get("/venda/listar", authMiddleware)
router.post("/venda/cadastrar", authMiddleware)  //check
router.put("/venda/atualizar", authMiddleware)
router.delete("vendas/deletar/:vendaId", authMiddleware)

module.exports = router;