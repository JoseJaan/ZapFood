const vendaProd = require("../database/models/Venda-Produto.js");
const Venda = require("../database/models/Venda.js");
const VendaProduto = require("../database/models/Venda-Produto.js");

class VendaRepository{

    static async buscarVenda(vendaId, transaction = null) {
        return await Venda.findOne({
            where: { id: vendaId },
            transaction,
        });
    }

    static async buscarVendaProdutos(vendaId, transaction = null) {
        return await vendaProd.findAll({
            where: { vendaId },
            transaction,
        });
    }

    static async buscarVendaLoja(vendaId, transaction = null) {
        return await EmpresaVenda.findOne({
            where: { vendaId },
            transaction,
        });
    }

    static async criarVenda(idCliente,idLoja,enderecoId) {
        try {
            const novaVenda = new Venda();

            novaVenda.idEndereco = enderecoId;
            novaVenda.idCliente = idCliente;
            novaVenda.idLoja = idLoja;

            await novaVenda.save();
            console.log(novaVenda.id)
            return novaVenda.id;

        }
        catch (error) {
            console.error("Erro ao criar a venda:", error)
            throw new Error("Erro ao criar venda no banco de dados.");
        }
    }
    static async criarVendaProduto(vendaId, produtos) {
        try {
            produtos.forEach(element => {
                VendaProduto.create({
                    vendaId: vendaId,
                    produtoId: element.idProduto
                });
            });
        }
        catch (error) {
            console.error("Erro ao criar a relação produto-venda:", error)
            throw new Error("Erro ao criar venda no banco de dados.");
        }    
    }

    static async criarEmpresaVenda(empresaVendaData) {
        try {
            return await VendaEmpresa.create(empresaVendaData);
        }
        catch (error) {
            console.error("Erro ao criar a relação empresa-venda:", error)
            throw new Error("Erro ao criar venda no banco de dados.");
        }    
    }

    static async excluirVenda(vendaId, transaction = null) {
        try {
            const venda = await Venda.findByPk(vendaId);
            if (!venda) {
                return null;
            }
            const dadosAtualizados = {visibilidade:3}
            await venda.update(dadosAtualizados); // Atualiza qualquer campo fornecido
            return venda;
        } catch (error) {
            console.error("Erro ao atualizar a venda:", error);
            throw new Error("Erro ao atualizar a venda no banco de dados.");
        }
    }       
    
    static async removerProdutosDaVenda(vendaId, transaction = null) {
        try {
            const venda = await VendaProduto.findByPk(vendaId);
            if (!venda) {
                return null;
            }
            const dadosAtualizados = {visibilidade:3}
            await venda.update(dadosAtualizados); // Atualiza qualquer campo fornecido
            return venda;
        } catch (error) {
            console.error("Erro ao atualizar a venda:", error);
            throw new Error("Erro ao atualizar a venda no banco de dados.");
        }
    }

    static async removerVendaLoja(vendaId, transaction = null) {
        try {
            const venda = await VendaEmpresa.findByPk(vendaId);
            if (!venda) {
                return null;
            }
            const dadosAtualizados = {visibilidade:3}
            await venda.update(dadosAtualizados); // Atualiza qualquer campo fornecido
            return venda;
        } catch (error) {
            console.error("Erro ao atualizar a venda:", error);
            throw new Error("Erro ao atualizar a venda no banco de dados.");
        }
    }

    static async buscarVendaPorId(id){
        try {
            const venda = await Venda.findByPk(id);
            if (!venda) {
                return false;
            }
            return true;
        } catch (error) {
            console.error("Erro ao buscar venda:", error);
            throw new Error("Erro ao buscar venda no banco de dados.");
        }
    }

}
    


module.exports = VendaRepository;