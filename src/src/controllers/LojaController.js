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
        console.log("loja no controller",loja)
        const produtos = await produtoService.listarProdutos(lojaId); 
        console.log("produtos no controller", produtos)
        const produtosEmPromocao = produtos.filter(produto => produto.desconto > 0);
        res.render('paginaDaEmpresa', {
            loja: loja,
            produtosEmPromocao: produtosEmPromocao,
            todosProdutos: produtos,
        });

    }

    static async paginaPrincipal(req,res){
        res.render('paginaPrincipalLoja');
    }

    //DELETAR ENDERECO === SE ESTIVER EM UMA VENDA, ALTERAR VISIBILIDADE PARA 0
}

module.exports = LojaController