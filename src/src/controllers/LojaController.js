const path = require("path");
const lojaService = require(path.resolve("src", "services", "Loja.js"));
const produtoService = require(path.resolve("src", "services", "Produto.js"));
class LojaController{

    static async detalharLoja(req,res){
        return res.render('produto')
    }

    static async obterLoja(req,res){
        const lojaId = req.user.id;

        try{
            const lojaData = await lojaService.obterLoja(lojaId);
            return res.status(200).send(lojaData);
        }
        catch(error){
            console.error(error.message);
            return res.status(400).send("Erro ao obter loja");
        }
    }

    static async buscarLoja(req,res){
        const lojaId = req.params.idLoja;

        const loja = await lojaService.obterLoja(lojaId);
        const produtos = await produtoService.listarProdutos(lojaId); 
        const produtosEmPromocao = produtos.filter(produto => produto.desconto > 0);
        res.render('paginaDaEmpresa', {
            loja: loja,
            produtosEmPromocao: produtosEmPromocao,
            todosProdutos: produtos,
        });

    }

    static async paginaPrincipal(req, res) {
        const lojaId = req.user.id;
        try {
            const loja = await lojaService.obterLoja(lojaId);
            const produtos = await produtoService.listarProdutosMaisVendidos(lojaId); // Usa o método atualizado
            res.render("paginaPrincipalLoja", {
                loja: loja,
                produtos: produtos.map(produto => ({
                    nome: produto.nomeProduto,
                    totalVendidos: produto.quantidadeVendida,
                    preco: produto.precoProduto,
                    foto: produto.foto,
                })),
            });
        } catch (error) {
            console.error("Erro ao carregar a página principal:", error);
            res.status(500).send("Erro ao carregar a página principal.");
        }
    }
    

    static async excluirConta(req,res){
        const idLoja = req.user.id;

        lojaService.deletarLoja(idLoja);

        res.render('login')
    }

    //DELETAR ENDERECO === SE ESTIVER EM UMA VENDA, ALTERAR VISIBILIDADE PARA 0
}

module.exports = LojaController