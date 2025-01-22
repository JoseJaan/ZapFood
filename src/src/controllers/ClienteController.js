const path = require("path");


class ClienteController{

    static async paginaPrincipal(req,res){
        res.render('paginaPrincipalCliente');
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