const Loja = require("../database/models/Loja.js");

class LojaRepository{

    static async buscarLoja(lojaId) {

        try {
            return await Loja.findOne({ id: lojaId });
        } catch (error) {
            console.error("Erro ao buscar loja:", error);
            throw new Error("Erro ao buscar loja no banco de dados.");
        }
    }


}

module.exports = LojaRepository;