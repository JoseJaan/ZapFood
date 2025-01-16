const produtoRepository = require("../database/models/Produto")

class produtoService{

    static async cadastrarProduto(produtoData){
        const { nome, preco, desconto, descricao, categoria, Loja_idLoja } = produtoData;

        if (!preco || !desconto || !descricao || !categoria || !nome) {
            throw new Error("Todos os campos são obrigatórios");
        }

        const novoProduto = await produtoRepository.cadastrarProduto(produtoData);

        return novoProduto;
    }

    static async atualizarProduto(id, produtoData) {
        if (!id) {
            throw new Error("ID do produto é obrigatório.");
        }
    
        const camposValidos = ["nome", "preco", "desconto", "descricao", "categoria","visibilidade"];
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

        const produto = await produtoRepository.buscarPorId(id);
    
        if (!produto || produto.Loja_idLoja !== produtoData.lojaId) {
            return null; // Produto não encontrado ou não pertence à loja
        }
    
        const produtoAtualizado = await produtoRepository.atualizar(id, dadosFiltrados);
    
        return produtoAtualizado;
    }

    static async excluirProduto(id, lojaId) {
        if (!id) {
            throw new Error("ID do produto é obrigatório.");
        }
    
        // Busca o produto pelo ID e valida se ele pertence à loja
        const produto = await produtoRepository.buscarPorId(id);
    
        if (!produto || produto.Loja_idLoja !== lojaId) {
            return null; // Produto não encontrado ou não pertence à loja
        }
    
        // Verifica se o produto está associado a uma venda
        //const produtoEmVenda = await produtoRepository.verificarProdutoEmVenda(id);
    
        if (produtoEmVenda) {
            // Se estiver em uma venda, altera a visibilidade
            await produtoRepository.alterarVisibilidade(id, 0);
            return { status: "Produto encontrado em vendas, exclusão não permitida. Visibilidade alterada." };
        } else {
            // Se não estiver, exclui o produto
            await produtoRepository.excluir(id);
            return { status: "Produto excluído com sucesso." };
        }
    }

    static async listarProdutos(lojaId) {
        if (!lojaId) {
            throw new Error("ID da loja é obrigatório.");
        }
    
        const produtos = await produtoRepository.listarPorLoja(lojaId);
    
        return produtos;
    }

    static async obterProduto(id, lojaId) {
        if (!id) {
            throw new Error("ID do produto é obrigatório.");
        }
    
        const produto = await produtoRepository.obterPorIdELoja(id, lojaId);
    
        if (!produto) {
            return null; 
        }
    
        return produto;
    }
    

}

module.exports = produtoService