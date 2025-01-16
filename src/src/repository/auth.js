const Cliente = require("../database/models/Cliente.js");
const Loja = require("../database/models/Loja.js");

class ClienteRepository {
    //'model' é passado como parametro para não precisar criar mais funções que realizem a mesma função de buscar pelo email
    static async buscarPorEmail(model, email) {
        console.log('Modelo recebido:', model);
        console.log('Métodos disponíveis:', Object.keys(model));
        try {
            const cliente = Cliente.findOne({ where: { email } });
            const loja = Loja.findOne({ where: { email } });

            if (cliente != undefined){
                return cliente
            }
            else{
                return loja
            }
        } catch (error) {
            console.error("Erro ao buscar por email:", error);
            throw new Error("Erro no banco de dados");
        }
    }

    // Criação de um novo cliente
    static async criar(model, clienteData) {
        try {
            return await model.create(clienteData);
        } catch (error) {
            console.error("Erro ao criar registro:", error);
            throw new Error("Erro ao salvar registro no banco de dados");
        }
    }
}


module.exports = ClienteRepository;