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
}


module.exports = produtoRepository