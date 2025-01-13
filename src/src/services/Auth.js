const ClienteRepository = require("../repository/auth.js");
const bcrypt = require("bcrypt");
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

    static async autenticar(email, senha) {
        // Buscar o cliente no banco pelo e-mail
        const cliente = await ClienteRepository.buscarPorEmail(email);
        if (!cliente) {
            throw new Error('E-mail ou senha inválidos');
        }

        // Comparar a senha fornecida com o hash armazenado
        const senhaCorreta = await bcrypt.compare(senha, cliente.senha);
        if (!senhaCorreta) {
            throw new Error('E-mail ou senha inválidos');
        }

        return cliente; // Retorna o cliente autenticado
    }
}

module.exports = AuthService;