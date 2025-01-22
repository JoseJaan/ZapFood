const path = require("path");
const carrinhoService = require(path.resolve("src", "services", "Carrinho.js"));

class CarrinhoController{

    static async verCarrinho(req,res){
        const produtos = await carrinhoService.buscarProdutosCarrinho(req.user.id);
        res.render('carrinho', {produtos: produtos});
    }

    static async adicionarAoCarrinho(req,res){
        carrinhoService.adicionarProdutoAoCarrinho(req.user.id,req.body.id);
        res.redirect('/verCarrinho')
    }

    static async excluirProdutoCarrinho(req,res){
        carrinhoService.excluirProdutoCarrinho(req.user.id, req.body.id);
    }

}

module.exports = CarrinhoController