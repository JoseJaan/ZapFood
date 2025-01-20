const vendaRepository = require("../repository/Venda")

class VendaService{

    static async obterVenda(vendaId) {
        if (!vendaId) {
            throw new Error("ID da venda é obrigatório.");
        }

        // Inicia uma transação
        const transaction = await database.transaction();

        try {
            // Realiza as buscas dentro da transação
            const venda = await vendaRepository.buscarVenda(vendaId, transaction);
            if (!venda) {
                throw new Error("Venda não encontrada.");
            }

            const produtos = await vendaRepository.buscarVendaProdutos(vendaId, transaction);
            if (!produtos || produtos.length === 0) {
                throw new Error("Nenhum produto associado a esta venda.");
            }

            const loja = await vendaRepository.buscarVendaLoja(vendaId, transaction);
            if (!loja) {
                throw new Error("Loja associada à venda não encontrada.");
            }

            // Confirma a transação
            await transaction.commit();

            // Retorna os dados combinados como um dicionário
            return {
                venda: venda.toJSON(), // Converte para objeto JS puro
                produtos: produtos.map(produto => produto.toJSON()), // Mapeia e converte cada item
                loja: loja.toJSON(),
            };
        } catch (error) {
            // Reverte a transação em caso de erro
            await transaction.rollback();
            throw new Error(`Erro ao obter dados da venda: ${error.message}`);
        }
    }


    static async cadastrarVenda({ produtos, idCliente, lojaId }) {
        // Cria a venda no banco
        const venda = await vendaRepository.criarVenda({
            idCliente
        });

        // Associa os produtos à venda
        for (const produtoId of produtos) {
            await vendaRepository.buscarVendaProdutos({
                vendaId: venda.id,
                produtoId
            });
        }

        // Associa a venda à loja
        await vendaRepository.criarEmpresaVenda({
            vendaId: venda.id,
            empresaId: lojaId
        });

        return venda;
    }

    static async excluirVenda(vendaId, lojaId) {
        if (!vendaId) {
            throw new Error("ID da venda é obrigatório.");
        }

        // Inicia uma transação
        const transaction = await database.transaction();

        try {
            
            // Verifica se a venda pertence à loja
            const vendaLoja = await vendaRepository.buscarVendaLoja(vendaId, transaction);
            if (!vendaLoja || vendaLoja.empresaId !== lojaId) {
               throw new Error("Venda não pertence à loja autenticada.");
            }

            // Remove os produtos associados à venda
            await vendaRepository.removerProdutosDaVenda(vendaId, transaction);

            // Remove a associação da venda com a loja
            await vendaRepository.removerVendaLoja(vendaId, transaction);

            // Remove a venda
            const resultado = await vendaRepository.excluirVenda(vendaId, transaction);

            if (!resultado) {
                throw new Error("Venda não encontrada.");
            }

            // Confirma a transação
            await transaction.commit();

            return true; // Sucesso
        } catch (error) {
            // Reverte a transação em caso de erro
            await transaction.rollback();
            throw new Error(`Erro ao excluir venda: ${error.message}`);
        }
    }

}

module.exports = VendaService