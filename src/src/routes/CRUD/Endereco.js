const express = require('express');
const path = require("path");
const router = express.Router();
const authMiddleware = require(path.resolve("src","middleware","clienteMiddleware.js"));
const EnderecoController = require(path.resolve("src","controllers","EnderecoController.js"));


router.post("/endereco/cadastrar",authMiddleware,EnderecoController.cadastro);
router.put("/endereco/editar/:idEndereco",authMiddleware,EnderecoController.atualizarEndereco);
router.delete("/endereco/excluir/:idEndereco",authMiddleware,EnderecoController.excluirEndereco);
router.get("/enderecos",authMiddleware,EnderecoController.listarEnderecos);
router.get("/endereco/detalhar/:idEndereco",authMiddleware,EnderecoController.obterEndereco);

module.exports = router;