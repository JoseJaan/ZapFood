const userRepository = require("../repository/auth.js");
const bcrypt = require("bcrypt");
const Cliente = require("../database/models/Cliente.js");
const Loja = require("../database/models/Loja.js");
class AuthService {
    static async cadastro(clienteData) {
        const { email, senha, endereco, cpf, idade, nome } = clienteData;
        console.log("entrou no services/auth cadastro cliente")
        // Validações básicas
        if (!email || !senha || !endereco || !cpf || !idade || !nome) {
            throw new Error("Todos os campos são obrigatórios");
        }
        
        // Verificar se o cliente já existe no banco
        const clienteExistente = await userRepository.buscarPorEmail(Cliente, email);
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
        const empresaExistente = await userRepository.buscarPorEmail(Loja, email);
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

        //Se o registro tiver um CNPJ, ele é uma loja
        if(user.cnpj != undefined){
            user.tipo = 'loja'
        }
        else{
            user.tipo = 'cliente'
        }

        if (!user) {
            throw new Error('E-mail ou senha inválidos.');
        }

        // Comparar a senha fornecida com o hash armazenado
        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        if (!senhaCorreta) {
            throw new Error('E-mail ou senha inválidos.');
        }

        return cliente; // Retorna o usuário autenticado
    }
}

module.exports = AuthService;