const Cliente = require("../database/models/Cliente.js");
const Loja = require("../database/models/Loja.js")
const Produto = require("../database/models/Produto.js");


class ClienteRepository{

    static async buscarProdutosPromocao(){
        const maioresDescontos = await Produto.findAll({
            order: [['desconto', 'DESC']],
            limit: 4,
          });

          return maioresDescontos;
    }

    static async buscarLojasPopulares(){
        const lojas = await Loja.findAll({
            limit: 4,
        });
        return lojas;
    }

    static async atualizarCliente(idCliente, data){
        try {
            const cliente = await Cliente.findByPk(idCliente);
            if (!cliente) {
                return null;
            }
            await cliente.update(data); // Atualiza qualquer campo fornecido
            return cliente;
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            throw new Error("Erro ao atualizar cliente no banco de dados.");
        }
    }

    static async excluirCliente(idCliente){
        try {
            await Cliente.destroy({ where: { idCliente } });
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            throw new Error("Erro ao excluir cliente do banco de dados.");
        }      
    }

    static async editarPerfil(nome,cpf,idade,userId){
        const cliente = await Cliente.findByPk(userId);
        cliente.nome = nome;
        cliente.cpf = cpf;
        cliente.idade = idade;
        cliente.save();
    }

    static async buscarCliente({ id, visibilidade } = {}) {
        const whereClause = {};
        if (id) whereClause.id = id;
        if (visibilidade !== undefined) whereClause.visibilidade = visibilidade;
    
        try {
            return await Cliente.findOne({ where: whereClause });
        } catch (error) {
            console.error("Erro ao buscar Cliente:", error);
            throw new Error("Erro ao buscar Cliente no banco de dados.");
        }
    }



}

module.exports = ClienteRepository;