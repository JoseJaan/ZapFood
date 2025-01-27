const produtoRepository = require("../repository/Produto")

class produtoService{

    //Cadastra o produto
    static async cadastrarProduto(produtoData){
        const { nomeProduto, precoProduto, desconto, descricaoProduto, categoria, Loja_idLoja, img, public_id } = produtoData;

        if (!precoProduto || !desconto || !descricaoProduto || !nomeProduto) {
            throw new Error("Todos os campos são obrigatórios");
        }

        const novoProduto = await produtoRepository.cadastrar(produtoData);

        return novoProduto;
    }

    //Atualiza o produto
    //Nenhum campo é obrigatório
    static async atualizarProduto(id, produtoData) {
        if (!id) {
            throw new Error("ID do produto é obrigatório.");
        }
    
        const camposValidos = ["nomeProduto", "precoProduto", "desconto", "descricaoProduto", "categoria","visibilidade","img","public_id"];
        const dadosFiltrados = {};
    
        //Seleciona apenas os campos enviados
        camposValidos.forEach((campo) => {
            if (produtoData[campo] !== undefined) {
                dadosFiltrados[campo] = produtoData[campo];
            }
        });
    
        if (Object.keys(dadosFiltrados).length === 0) {
            throw new Error("Nenhum campo para atualizar foi enviado.");
        }
        const lojaId = produtoData.lojaId;
        const produto = await produtoRepository.buscarProduto({ id, lojaId, visibilidade: 1 });

        if (!produto || produto.Loja_idLoja !== produtoData.lojaId) {
            return null; // Produto não encontrado ou não pertence à loja
        }
    
        const produtoAtualizado = await produtoRepository.atualizar(id, dadosFiltrados);
    
        return produtoAtualizado;
    }

    //Excluir produto
    //Se houver vendas com aquele produto, ele não é efetivamente excluido, e sim desativado
    static async excluirProduto(id, lojaId) {
        if (!id) {
            throw new Error("ID do produto é obrigatório.");
        }
    
        // Busca o produto pelo ID e valida se ele pertence à loja
        const produto = await produtoRepository.buscarProduto({ id, lojaId, visibilidade: 1 });
        if (!produto || produto.Loja_idLoja !== lojaId) {
            return null; // Produto não encontrado ou não pertence à loja
        }
    
        // Verifica se o produto está associado a uma venda
        const produtoEmVenda = await produtoRepository.verificarProdutoEmVenda(id);
    
        if (produtoEmVenda) {
            // Se estiver em uma venda, altera a visibilidade
            await produtoRepository.atualizar(id, { visibilidade: 0 });
            return { status: "Produto encontrado em vendas, exclusão não permitida. Visibilidade alterada." };
        } else {
            // Se não estiver, exclui o produto
            await produtoRepository.excluir(id);
            return { status: "Produto excluído com sucesso." };
        }
    }

    //Lista todos os produtos de uma loja
    static async listarProdutos(lojaId) {
        if (!lojaId) {
            throw new Error("ID da loja é obrigatório.");
        }
    
        const produtos = await produtoRepository.listarPorLoja(lojaId);
    
        return produtos;
    }

    //Lista apenas 1 produto da loja
    static async obterProduto(id) {
        if (!id) {
            throw new Error("ID do produto é obrigatório.");
        }
    
        const produto = await produtoRepository.buscarProduto({ id, visibilidade: 1 });
    
        if (!produto) {
            return null; 
        }
    
        return produto;
    }

    static async listarProdutosMaisVendidos(lojaId){
        if (!lojaId) {
            throw new Error("ID da loja é obrigatório.");
        }

        const produtos = await produtoRepository.listarMaisVendidosPorLoja(lojaId);
    
        return produtos;
    }
    

}

module.exports = produtoService