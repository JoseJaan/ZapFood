const carrinhoRepository = require("../repository/Carrinho");
const produtoRepository = require("../repository/Produto");

class CarrinhoService{

    //Cadastra o endereco
    static async buscarProdutosCarrinho(id){
        const produtos = await carrinhoRepository.buscarProdutos(id);
        
        if(!produtos){
            return null;
        }

        return produtos;
    }

    static async adicionarProdutoAoCarrinho(idUser, idProduto) {
        // Busca os dados do produto
        const produto = await produtoRepository.buscarProduto({ id: idProduto });
        if (!produto) {
            throw new Error('Produto não encontrado');
        }
    
        // Busca os produtos já adicionados ao carrinho do usuário
        const produtosNoCarrinho = await carrinhoRepository.buscarProdutos(idUser); // Retorna apenas os IDs dos produtos
    
        // Validação: verifica se o carrinho já contém produtos de outra loja
        if (produtosNoCarrinho.length > 0) {
            const idsProdutosNoCarrinho = produtosNoCarrinho.map(p => p.idProduto);

            // Busca informações dos produtos já no carrinho
            const produtosExistentes = await produtoRepository.buscarProduto({id: idsProdutosNoCarrinho});

            const lojaExistente = produtosExistentes.Loja_idLoja;

            if (produto.Loja_idLoja !== lojaExistente) {
                throw new Error('Não é possível adicionar produtos de lojas diferentes ao carrinho.');
            }
        }
    
        // Adiciona o produto ao carrinho
        await carrinhoRepository.adicionarProdutoAoCarrinho( idUser, idProduto );
    }

    static async excluirProdutoCarrinho(idUser, idProduto){
        await carrinhoRepository.excluirProdutoCarrinho(idUser,idProduto);
    }

    static async esvaziarCarrinho(userId){
        await carrinhoRepository.excluirProdutosUsuario(userId);
    }


}

module.exports = CarrinhoService;