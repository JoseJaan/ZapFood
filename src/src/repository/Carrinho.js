const Cliente = require("../database/models/Cliente.js");
const Produto = require("../database/models/Produto.js");
const Carrinho = require("../database/models/Carrinho.js");
const { where } = require("sequelize");


class CarrinhoRepository{

    static async buscarProdutos(id){
        const idProdutos = await Carrinho.findAll({where: {idUser: id}});
        const produtos = Array();
        for (const element of idProdutos) {
            const produtoAchado = await Produto.findByPk(element.idProduto);
            await produtos.push(produtoAchado);
        }
    
        return produtos;
    }


    static async adicionarProdutoAoCarrinho(idUsuario,idProduto){
        const produtoNoCarrinho = await new Carrinho();
        produtoNoCarrinho.idUser = idUsuario;
        produtoNoCarrinho.idProduto = idProduto;

        produtoNoCarrinho.save();

    }

    static async excluirProdutoCarrinho(idUser,idProduto){
        await Carrinho.destroy({
            where:{
                idProduto:idProduto,
                idUser: idUser
            }
        })

    }



}

module.exports = CarrinhoRepository;