const produtoRepository = require("../database/models/Produto")

class produtoService{

    static async cadastrarProduto(produtoData){
        const { nome, preco, desconto, descricao, categoria } = produtoData;

        if (!preco || !desconto || !descricao || !categoria || !nome) {
            throw new Error("Todos os campos são obrigatórios");
        }

        const novoProduto = await produtoRepository.cadastrarProduto(produtoData);

        return novoProduto;
    }

}

module.exports = produtoService