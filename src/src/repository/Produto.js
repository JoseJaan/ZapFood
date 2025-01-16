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
    
            await produto.update(dadosAtualizados);
            return produto;
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            throw new Error("Erro ao atualizar produto no banco de dados.");
        }
    }

    static async buscarPorId(id) {
        try {
            return await Produto.findByPk(id);
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            throw new Error("Erro ao buscar produto no banco de dados.");
        }
    }

    static async verificarProdutoEmVenda(produtoId) {
        try {
            const produtoEmVenda = await VendaHasProduto.findOne({
                where: { Produto_idProduto: produtoId },
            });

            return !!produtoEmVenda; //Retorna true se o produto estiver em uma venda
        } catch (error) {
            console.error("Erro ao verificar produto em venda:", error);
            throw new Error("Erro ao verificar associação do produto.");
        }
    }

    static async alterarVisibilidade(id, visibilidade) {
        try {
            const produto = await Produto.findByPk(id);
            if (produto) {
                await produto.update({ visibilidade });
            }
        } catch (error) {
            console.error("Erro ao alterar visibilidade:", error);
            throw new Error("Erro ao alterar visibilidade do produto.");
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
}


module.exports = produtoRepository