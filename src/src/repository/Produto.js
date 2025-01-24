const { Op, Sequelize } = require("sequelize");
const Produto = require("../database/models/Produto.js");
const VendaProd = require("../database/models/Venda-Produto.js");
const Venda = require("../database/models/Venda.js");

class produtoRepository{
    static async cadastrar(produtoData){
        try {
            return await Produto.create(produtoData);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            throw new Error("Erro ao salvar produto no banco de dados");
        }
    }

    static async atualizar(idProduto, dadosAtualizados) {
        console.log("Chegou no repository!")
        try {
            const produto = await Produto.findByPk(idProduto);
            if (!produto) {
                return null;
            }
            await produto.update(dadosAtualizados); // Atualiza qualquer campo fornecido
            return produto;
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            throw new Error("Erro ao atualizar produto no banco de dados.");
        }
    }

    static async buscarProduto({ id, visibilidade } = {}) {
        const whereClause = {};
        if (id) whereClause.idProduto = id;
        if (visibilidade !== undefined) whereClause.visibilidade = visibilidade;
    
        try {
            return await Produto.findOne({ where: whereClause });
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            throw new Error("Erro ao buscar produto no banco de dados.");
        }
    }

    static async verificarProdutoEmVenda(produtoId) {
        try {
            return await VendaHasProduto.findOne({
                where: { Produto_idProduto: produtoId },
            }) !== null; // Retorna true se encontrado, false caso contrário
        } catch (error) {
            console.error("Erro ao verificar produto em venda:", error);
            throw new Error("Erro ao verificar associação do produto.");
        }
    }

    static async excluir(idProduto) {
        try {
            await Produto.destroy({ where: { idProduto } });
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            throw new Error("Erro ao excluir produto do banco de dados.");
        }
    }

    static async listarPorLoja(lojaId) {
        try {
            return await Produto.findAll({
                where: { Loja_idLoja: lojaId, visibilidade: 1 }, // Busca apenas produtos visíveis da loja
                attributes: ["idProduto", "nomeProduto", "precoProduto", "desconto", "descricaoProduto", "categoriaProduto", "img"],
            });
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            throw new Error("Erro ao buscar produtos no banco de dados.");
        }
    }

    static async listarMaisVendidosPorLoja(lojaId) {
        try {
    
            // Buscar todas as vendas da loja especificada
            const vendasLoja = await Venda.findAll({
                where: { idLoja: lojaId },
                attributes: ['id'], // Obtemos apenas os IDs das vendas
            });
    
            // Extrair os IDs das vendas
            const vendasIds = vendasLoja.map(venda => venda.id);
    
            // Consultar os produtos mais vendidos
            const produtosMaisVendidos = await VendaProd.findAll({
                where: {
                    vendaId: vendasIds, // Filtro para vendas da loja
                },
                attributes: [
                    'produtoId',
                    [Sequelize.fn('COUNT', Sequelize.col('produtoId')), 'quantidade_vendida']
                ],
                group: ['produtoId'], // Agrupa pelo produto
                order: [[Sequelize.literal('quantidade_vendida'), 'DESC']], // Ordena pela quantidade vendida
                limit: 3 // Limita aos 3 mais vendidos
            });
    
            // Buscar detalhes dos produtos mais vendidos
            const produtosDetalhados = await Promise.all(
                produtosMaisVendidos.map(async produto => {
                    const detalhesProduto = await Produto.findByPk(produto.produtoId);
                    return {
                        produtoId: produto.produtoId,
                        nomeProduto: detalhesProduto?.dataValues?.nomeProduto || "Nome não disponível",
                        quantidadeVendida: produto.dataValues.quantidade_vendida,
                        precoProduto: detalhesProduto?.dataValues?.precoProduto,
                        img: detalhesProduto?.dataValues?.img,
                    };
                })
            );
    
            return produtosDetalhados;
    
        } catch (error) {
            console.error("Erro ao buscar os produtos mais vendidos:", error);
            throw new Error("Erro ao buscar os produtos mais vendidos no banco de dados.");
        }
    }

}


module.exports = produtoRepository