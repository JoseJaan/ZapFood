const path = require("path");
const clienteService = require(path.resolve("src", "services", "Cliente.js"));
const produtoService = require(path.resolve("src", "services", "Produto.js"));
const enderecoService = require(path.resolve("src", "services", "Endereco.js"));

class ClienteController{

    static async paginaPrincipal(req,res){
        const produtos = await clienteService.maioresPromocoes();
        const lojasPopulares = await clienteService.lojasPopulares();

        res.render('paginaPrincipalCliente', {produtos:produtos, lojas: lojasPopulares});
    }

    static async verCarrinho(req,res){
        res.render('carrinho');
    }

    static async finalizarCompra(req,res){
        const enderecos = await enderecoService.listarEnderecos(req.user.id);
        res.render('finalizarCompra',{enderecos:enderecos});
    }

    static async paginaEmpresa(req,res){
        res.render('paginaDaEmpresa');
    }


    static async verProduto(req,res){
        const produto = await produtoService.obterProduto(req.params.id);
        
        res.render('produtoVer',{produto:produto});
    }

    static async excluirConta(req,res){
        const idCliente = req.user.id;

        clienteService.deletarCliente(idCliente);

        res.render('login')
    }

}

module.exports = ClienteController