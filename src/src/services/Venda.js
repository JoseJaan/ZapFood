const vendaRepository = require("../repository/Venda")

class VendaService{

    static async obterVendas(userId) {
        try {
            const vendas = await vendaRepository.obterVendas(userId);

            return vendas;
            
        } catch (error) {
            // Reverte a transação em caso de erro
            throw new Error(`Erro ao obter dados da venda: ${error.message}`);
        }
    }


    static async cadastrarVenda( idCliente,produtos,enderecoId) {
        let idLoja;

        produtos.forEach(element => {
            idLoja = element.Loja_idLoja;
        });

        const venda = await vendaRepository.criarVenda(idCliente,idLoja,enderecoId);
        vendaRepository.criarVendaProduto(venda,produtos);
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