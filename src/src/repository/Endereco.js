const Endereco = require("../database/models/Endereco");
const Venda = require("../database/models/Venda");
const Cliente = require("../database/models/Cliente");
class EnderecoRepository{

    static async cadastrarEndereco(enderecoData) {
        try {
            return await Endereco.create(enderecoData);
        } catch (error) {
            console.error("Erro ao criar endereco:", error);
            throw new Error("Erro ao cadastrar endereco no banco de dados.");
        }
    }

    static async atualizarEndereco(idEndereco, dadosAtualizados) {
        try {
            const endereco = await Endereco.findByPk(idEndereco);
            if (!endereco) {
                return null;
            }

            await endereco.update(dadosAtualizados); 
            
            return endereco;
        } catch (error) {
            console.error("Erro ao atualizar endereco:", error);
            throw new Error("Erro ao atualizar endereco no banco de dados.");
        }
    }

    static async buscarEndereco({ idEndereco, visibilidade } = {}) {
        const whereClause = {};
        if (idEndereco) whereClause.idEndereco = idEndereco;
        if (visibilidade !== undefined) whereClause.visibilidade = visibilidade;
    
        try {
            return await Endereco.findOne({ where: whereClause });
        } catch (error) {
            console.error("Erro ao buscar endereco:", error);
            throw new Error("Erro ao buscar endereco no banco de dados.");
        }
    }

    static async listarPorCliente(idCliente) {
        try {
            return await Endereco.findAll({
                where: { idCliente: idCliente, visibilidade: 1 }, 
                attributes: ["idEndereco", "idCliente", "cidade", "CEP", "rua", "numero", "complemento", "visibilidade", "nome"],
            });
        } catch (error) {
            console.error("Erro ao listar enderecos:", error);
            throw new Error("Erro ao buscar enderecos no banco de dados.");
        }
    }

    static async verificarEnderecoEmVenda(idEndereco) {
        try {
            return await Venda.findOne({
                where: { idEndereco: idEndereco },
            }) !== null; // Retorna true se encontrado, false caso contrário
        } catch (error) {
            console.error("Erro ao verificar endereco em venda:", error);
            throw new Error("Erro ao verificar associação do endereco.");
        }
    }

    static async excluir(idEndereco) {
        try {
            await Endereco.destroy({ where: { idEndereco } });
        } catch (error) {
            console.error("Erro ao excluir endereco:", error);
            throw new Error("Erro ao excluir endereco do banco de dados.");
        }
    }

    static async buscarUsuario(id){

        return Cliente.findByPk(id);

    }
}

module.exports = EnderecoRepository;