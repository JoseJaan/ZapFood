const path = require("path");
const cloudinary = require(path.resolve("config", "cloudinary"));
const produtoService = require(path.resolve("src", "services", "Produto.js"));

class ProdutoController{

    static async cadastrarProduto(req,res){
        return res.render('produto')
    }

    //Cadastrar produto
    static async cadastro(req,res){

    
        const { nomeProduto, precoProduto, desconto, descricaoProduto } = req.body;

        //Verifica se o usuário autenticado é uma loja
        if(req.user.tipo != 'loja'){
            return res.status(403).send('Acesso não autorizado.');
        }

        const Loja_idLoja = req.user.id;

        try{
            let fotoUrl = null;
            let img;
            let public_id
            if (req.file) {
                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: "uploads",
                });
                
                img = uploadResult.url;
                public_id = uploadResult.public_id;
            }

            const novoProduto = produtoService.cadastrarProduto({nomeProduto,precoProduto,desconto,descricaoProduto,Loja_idLoja,img,public_id})

            return res.redirect("/produto");
        }
        catch(error){
            console.error(error.message);
            return res.status(400).render("Erro ao cadastrar produto", { error: error.message });
        }
    }

    //Atualizar produto
    //Nenhum campo é obrigatório
    static async atualizarProduto(req, res) {
        const {id} = req.params;
        const lojaId = req.user.id;
        const { nomeProduto, precoProduto, descricaoProduto, categoria, visibilidade, desconto } = req.body;
        if (req.user.tipo !== "loja") {
            return res.status(403).send("Acesso não autorizado.");
        }
        try {

            let fotoUrl = null;

            if (req.file) {
                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: "produtos",
                });
                fotoUrl = uploadResult.secure_url; 
            }

            const produtoAtualizado = await produtoService.atualizarProduto(id, {
                nomeProduto,
                precoProduto,
                desconto,
                descricaoProduto,
                categoria,
                visibilidade,
                lojaId,
                foto: fotoUrl
            });
    
            if (!produtoAtualizado) {
                return res.status(204).send("Produto não encontrado.");
            }
    
            return res.status(200).json({ success: true, message: "Produto atualizado com sucesso.", produto: produtoAtualizado });
        } catch (error) {
            console.log(error.message);
            return res
                .status(400)
                .send("Erro ao atualizar produto");
        }
    }

    //Excluir produto
    //Se houver vendas com aquele produto, ele não é efetivamente excluido, e sim desativado
    static async excluirProduto(req, res) {
        const { id } = req.params; // ID do produto a ser excluído
        const lojaId = req.user.id; // ID da loja do usuário autenticado
    
        try {
            const resultado = await produtoService.excluirProduto(id, lojaId);
    
            if (!resultado) {
                return res.status(403).send("Acesso negado ou produto não encontrado.");
            }
    
            return res.status(200).send("Produto excluido com sucesso"); 
        } catch (error) {
            console.error(error.message);
            return res
                .status(400)
                .send("Erro ao excluir produto");
        }
    }

    //Lista todos os produtos da loja
    static async listarProdutos(req, res) {
        const lojaId = req.user.id; 
    
        try {
            const produtos = await produtoService.listarProdutos(lojaId);
    
            return res.send( produtos ); 
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Erro ao listar produtos.");
        }
    }

    //Lista apenas 1 produto da loja 
    static async obterProduto(req, res) {
        const { id } = req.params; 
        const lojaId = req.user.id;
    
        try {
            const produto = await produtoService.obterProduto(id, lojaId);
    
            if (!produto) {
                return res.status(404).send("Produto não encontrado ou acesso negado.");
            }
    
            return res.send( produto );
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Erro ao buscar produto.");
        }
    }
    

}

module.exports = ProdutoController