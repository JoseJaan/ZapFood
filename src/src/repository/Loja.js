const Loja = require("../database/models/Loja.js");

class LojaRepository{

    static async buscarLoja(id) {
        try {
            return await Loja.findOne({ where: { id } });
        } catch (error) {
            console.error("Erro ao buscar loja:", error);
            throw new Error("Erro ao buscar loja no banco de dados.");
        }
    }


}

module.exports = LojaRepository;