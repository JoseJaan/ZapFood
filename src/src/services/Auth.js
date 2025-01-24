const userRepository = require("../repository/auth.js");
const bcrypt = require("bcrypt");
const Cliente = require("../database/models/Cliente.js");
const Loja = require("../database/models/Loja.js");
const JWT_EXPIRATION = '1h';
const path = require("path");
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const mailTransport = require('../modules/email/mailTransport.js');
class AuthService {
    static async cadastro(clienteData) {

        const { email, senha, cpf, idade, nome } = clienteData;

        // Validações básicas
        if (!email || !senha || !cpf || !idade || !nome) {
            throw new Error("Todos os campos são obrigatórios");
        }
        
        // Verificar se o cliente já existe no banco
        const clienteExistente = await userRepository.buscarPorEmail( email);
        if (clienteExistente) {
            throw new Error("E-mail já está em uso");
        }

        // Criar novo cliente no banco
        const novoCliente = await userRepository.criar(Cliente, clienteData);

        return novoCliente;
    }

    static async cadastroEmpresa(empresaData) {
        const { email, senha, nome, cnpj, horarioFuncionamento, descricao } = empresaData;
        empresaData.endereco = "teste";
        // Validações básicas
        if (!email || !senha || !nome || !cnpj || !horarioFuncionamento || !descricao) {
            throw new Error("Todos os campos são obrigatórios");
        }

        // Verificar se o cliente já existe no banco
        const empresaExistente = await userRepository.buscarPorEmail( email);
        if (empresaExistente) {
            throw new Error("E-mail já está em uso");
        }

        // Criar novo cliente no banco
        const novaEmpresa = await userRepository.criar(Loja, empresaData);

        return novaEmpresa;
    }

    static async autenticar(email, senha) {
        // Buscar o usuário no banco pelo e-mail
        const user = await userRepository.buscarPorEmail(email);

        if (!user) {
            throw new Error('E-mail ou senha inválidos.');
        }

        //Se o registro tiver um CNPJ, ele é uma loja
        if(user.cnpj != undefined){
            user.tipo = 'loja'
        }
        else{
            user.tipo = 'cliente'
        }

        // Comparar a senha fornecida com o hash armazenado
        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        if (!senhaCorreta) {
            throw new Error('E-mail ou senha inválidos.');
        }

        return user; // Retorna o usuário autenticado
    }

    static async forgotPasswordService (userEmail) {
        return new Promise(async (resolve, reject) => {
            try {
              const token = jwt.sign({ email: userEmail }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION });
      
              const emailTemplatePath = path.resolve(__dirname, '../modules/email/template/resetPassword.html');
              const templateResetPassword = await fs.readFile(emailTemplatePath, 'utf8');
      
              const resetPasswordLink = `http://localhost:3003/resSenha?token=${token}`;
              const HTMLTemplate = templateResetPassword.replace('{resetPasswordLink}', resetPasswordLink);
      
              const mailOptions = {
                from: process.env.EMAIL_USER,
                to: userEmail,
                subject: 'Redefinição de senha',
                html: HTMLTemplate,
              };
      
              await mailTransport.sendMail(mailOptions);
              resolve();
            } catch (error) {
              console.error('Erro ao processar o email de redefinição de senha.', error);
              reject(new Error('Erro ao enviar email.'));
            }
          });
      };
      static async resetPasswordService  (token, newPassword) {
        try {
          // Verifica e decodifica o token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const email = decoded.email;
          // Gera o hash da nova senha
          const hashedPassword = await bcrypt.hash(newPassword, 10);

          userRepository.redefinirSenha(hashedPassword,email)
        } catch (error) {
            console.error('Erro ao processar redefinição de senha.', error);
            reject(new Error('Erro ao resetar senha'));
        }
    };
};



module.exports = AuthService;