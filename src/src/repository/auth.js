const Cliente = require("../database/models/Cliente.js");

class ClienteRepository {
    static async buscarPorEmail(email) {
        try {
            return await Cliente.findOne({ where: { email } });
        } catch (error) {
            console.error("Erro ao buscar cliente por email:", error);
            throw new Error("Erro no banco de dados");
        }
    }

    // Criação de um novo cliente
    static async criar(clienteData) {
        try {
            return await Cliente.create(clienteData);
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            throw new Error("Erro ao salvar cliente no banco de dados");
        }
    }
}


module.exports = ClienteRepository;