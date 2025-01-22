const path = require("path");
const clienteService = require(path.resolve("src", "services", "Cliente.js"));

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
        res.render('finalizarCompra');
    }

    static async paginaEmpresa(req,res){
        res.render('paginaDaEmpresa');
    }

    static async verProduto(req,res){
        res.render('produtoVer');
    }


}

module.exports = ClienteController