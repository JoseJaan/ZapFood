const vendaProd = require("../database/models/Venda-Produto.js");
const Venda = require("../database/models/Venda.js");
const VendaProduto = require("../database/models/Venda-Produto.js");
const VendaEmpresa = require("../database/models/Loja-Venda.js");

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
    static async criarVenda(vendaData) {
        try {
        return await Venda.create(vendaData);
        }
        catch (error) {
            console.error("Erro ao criar a venda:", error)
            throw new Error("Erro ao criar venda no banco de dados.");
        }
    }
    static async VendaProduto(vendaProd) {
        try {
            return await VendaProduto.create(vendaProd);
            }
            catch (error) {
                console.error("Erro ao criar a relação produto-venda:", error)
                throw new Error("Erro ao criar venda no banco de dados.");
            }    }
    static async criarEmpresaVenda(empresaVendaData) {
        try {
            return await VendaEmpresa.create(empresaVendaData);
            }
            catch (error) {
                console.error("Erro ao criar a relação empresa-venda:", error)
                throw new Error("Erro ao criar venda no banco de dados.");
            }    }
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

}
    


module.exports = VendaRepository;