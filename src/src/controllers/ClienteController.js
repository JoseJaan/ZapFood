const path = require("path");
const clienteService = require(path.resolve("src", "services", "Cliente.js"));
const produtoService = require(path.resolve("src", "services", "Produto.js"));
const lojaService = require(path.resolve("src", "services", "Loja.js"));
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
        const loja = await lojaService.obterLoja(produto.Loja_idLoja)

        res.render('produtoVer',{produto:produto, loja:loja});
    }

    static async editarPerfil(req,res){
        try{
            if((req.body.nome == '') || (req.body.cpf == '') || (req.body.idade == '')){
                throw new Error('Campos Vazios');
            }
            if(isNaN(req.body.idade)){
                throw new Error('Idade Invalida');
            }
            await clienteService.editarPerfil(req.body.nome,req.body.cpf,req.body.idade,req.user.id);
            
        }
        catch(e){
            return res.redirect(`/enderecos?error=${e.message}`);
        }
            
    }



}

module.exports = ClienteController