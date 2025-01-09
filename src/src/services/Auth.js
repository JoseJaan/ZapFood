const ClienteRepository = require("../database/models/Cliente.js");

class AuthService {
    static async cadastro(clienteData) {
        const { email, senha, endereco, cpf, idade, nome } = clienteData;

        // Validações básicas
        if (!email || !senha || !endereco || !cpf || !idade || !nome) {
            throw new Error("Todos os campos são obrigatórios");
        }

        // Verificar se o cliente já existe no banco
        const clienteExistente = await ClienteRepository.buscarPorEmail(email);
        if (clienteExistente) {
            throw new Error("E-mail já está em uso");
        }

        // Criar novo cliente no banco
        const novoCliente = await ClienteRepository.criar(clienteData);

        return novoCliente;
    }
}

module.exports = AuthService;