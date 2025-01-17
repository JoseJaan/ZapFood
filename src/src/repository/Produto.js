const Produto = require("../database/models/Produto.js");

class produtoRepository{
    static async cadastrar(produtoData){
        try {
            return await Produto.create(produtoData);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            throw new Error("Erro ao salvar produto no banco de dados");
        }
    }

    static async atualizar(id, dadosAtualizados) {
        try {
            const produto = await Produto.findByPk(id);
    
            if (!produto) {
                return null;
            }
    
            await produto.update(dadosAtualizados); // Atualiza qualquer campo fornecido
            return produto;
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            throw new Error("Erro ao atualizar produto no banco de dados.");
        }
    }

    static async buscarProduto({ id, lojaId, visibilidade } = {}) {
        const whereClause = {};
        if (id) whereClause.idProduto = id;
        if (lojaId) whereClause.Loja_idLoja = lojaId;
        if (visibilidade !== undefined) whereClause.visibilidade = visibilidade;
    
        try {
            return await Produto.findOne({ where: whereClause });
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            throw new Error("Erro ao buscar produto no banco de dados.");
        }
    }

    static async verificarProdutoEmVenda(produtoId) {
        try {
            return await VendaHasProduto.findOne({
                where: { Produto_idProduto: produtoId },
            }) !== null; // Retorna true se encontrado, false caso contrário
        } catch (error) {
            console.error("Erro ao verificar produto em venda:", error);
            throw new Error("Erro ao verificar associação do produto.");
        }
    }

    static async excluir(id) {
        try {
            await Produto.destroy({ where: { id } });
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            throw new Error("Erro ao excluir produto do banco de dados.");
        }
    }

    static async listarPorLoja(lojaId) {
        try {
            return await Produto.findAll({
                where: { Loja_idLoja: lojaId, visibilidade: 1 }, // Busca apenas produtos visíveis da loja
                attributes: ["id", "nome", "preco", "desconto", "descricao", "categoria", "foto"],
            });
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            throw new Error("Erro ao buscar produtos no banco de dados.");
        }
    }

}


module.exports = produtoRepository