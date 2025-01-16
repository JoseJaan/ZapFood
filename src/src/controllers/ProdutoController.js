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

        const Loja_idLoja = req.user.id;

        try{
            const novoProduto = produtoService.cadastrarProduto({nome,preco,desconto,descricao,categoria,Loja_idLoja})

            return res.redirect("/cadastrar");
        }
        catch{
            console.log(error.message);
            return res.status(400).render("Erro ao cadastrar produto", { error: error.message });
        }
    }

    static async atualizarProduto(req, res) {
        const { id } = req.params;
        const lojaId = req.user.id;
        const { nome, preco, desconto, descricao, categoria, visibilidade } = req.body;
    
        if (req.user.tipo !== "loja") {
            return res.status(403).send("Acesso não autorizado.");
        }
    
        try {
            const produtoAtualizado = await produtoService.atualizarProduto(id, {
                nome,
                preco,
                desconto,
                descricao,
                categoria,
                visibilidade,
                lojaId
            });
    
            if (!produtoAtualizado) {
                return res.status(204).send("Produto não encontrado.");
            }
    
            return res.redirect(`/produto/${id}`);
        } catch (error) {
            console.log(error.message);
            return res
                .status(400)
                .render("Erro ao atualizar produto", { error: error.message });
        }
    }

    static async excluirProduto(req, res) {
        const { id } = req.params; // ID do produto a ser excluído
        const lojaId = req.user.id; // ID da loja do usuário autenticado
    
        try {
            const resultado = await produtoService.excluirProduto(id, lojaId);
    
            if (!resultado) {
                return res.status(403).send("Acesso negado ou produto não encontrado.");
            }
    
            return res.redirect("/produtos"); 
        } catch (error) {
            console.error(error.message);
            return res
                .status(400)
                .render("Erro ao excluir produto", { error: error.message });
        }
    }

    static async listarProdutos(req, res) {
        const lojaId = req.user.idLoja; 
    
        try {
            const produtos = await produtoService.listarProdutos(lojaId);
    
            return res.render("listaProdutos", { produtos }); 
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Erro ao listar produtos.");
        }
    }

    static async obterProduto(req, res) {
        const { id } = req.params; 
        const lojaId = req.user.idLoja;
    
        try {
            const produto = await produtoService.obterProduto(id, lojaId);
    
            if (!produto) {
                return res.status(404).send("Produto não encontrado ou acesso negado.");
            }
    
            return res.render("detalhesProduto", { produto });
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Erro ao buscar produto.");
        }
    }
    
}

module.exports = ProdutoController