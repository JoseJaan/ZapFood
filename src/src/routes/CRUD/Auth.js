const express = require('express');
const path = require("path");
const router = express.Router();
const AuthController = require(path.resolve("src","controllers","AuthController"));

router.get("/login",AuthController.fazerLogin);
router.post("/cadastro",AuthController.cadastro);
router.get("/registroCliente",AuthController.registroCliente);
router.post('/autenticar', AuthController.autenticar);

router.get('/registrarEmpresa',AuthController.registroEmpresa)
router.post('/registroEmpresa', AuthController.cadastroEmpresa)
router.get('/logout', AuthController.logout);

router.get('/redefinirSenha', AuthController.redefinirSenha);
router.post('/redSenha', AuthController.forgotPassword);
router.post('/resetarSenha', AuthController.resetPassword);
router.get('/resSenha', AuthController.resetarSenha);



module.exports = router;