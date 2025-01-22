const Cliente = require("../database/models/Cliente.js");
const Loja = require("../database/models/Loja.js");

class ClienteRepository {
    //'model' é passado como parametro para não precisar criar mais funções que realizem a mesma função de buscar pelo email
    static async buscarPorEmail( email) { 
        try {
            const cliente = await Cliente.findOne({ where: { email } });
            const loja = await Loja.findOne({ where: { email } });
            if (cliente !== null){
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

    static async redefinirSenha(novaSenha, email) {
        const dadosAtualizados = {senha: novaSenha}
        try {
            const cliente = await Cliente.findOne({ where:{email}});
            const loja = await Loja.findOne({ where:{email}});

            if(cliente != null){
                cliente.update(dadosAtualizados);
            } 
            else{
                loja.update(dadosAtualizados);
            }
        } catch (error) {
            console.error("Erro ao criar registro:", error);
            throw new Error("Erro ao salvar registro no banco de dados");
        }
    }
}


module.exports = ClienteRepository;