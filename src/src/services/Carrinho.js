const carrinhoRepository = require("../repository/Carrinho");

class CarrinhoService{

    //Cadastra o endereco
    static async buscarProdutosCarrinho(id){
        const produtos = await carrinhoRepository.buscarProdutos(id);
        
        if(!produtos){
            return null;
        }

        return produtos;
    }

    static async adicionarProdutoAoCarrinho(idUsuario,idProduto){
        
        carrinhoRepository.adicionarProdutoAoCarrinho(idUsuario,idProduto);

    }

    static async excluirProdutoCarrinho(idUser, idProduto){
        await carrinhoRepository.excluirProdutoCarrinho(idUser,idProduto);
    }


}

module.exports = CarrinhoService;