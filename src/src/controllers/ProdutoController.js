const path = require("path");
const produtoService = require(path.resolve("src", "services", "Produto.js"));

class ProdutoController{

    static async cadastrarProduto(req,res){
        return res.render('cadastrar')
    }

    static async cadastro(req,res){
        const { nome, preco, desconto, descricao, categoria } = req.body;

        if(req.user.tipo != 'loja'){
            return res.status(403).send('Acesso não autorizado.');
        }

        try{
            const novoProduto = produtoService.cadastrarProduto({nome,preco,desconto,descricao,categoria})

            return res.redirect("/cadastrar");
        }
        catch{
            console.log(error.message);
            return res.status(400).render("Erro ao cadastrar produto", { error: error.message });
        }
    }
}

module.exports = ProdutoController