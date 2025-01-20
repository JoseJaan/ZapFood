const lojaRepository = require("../repository/Loja")

class LojaService{

    static async obterLoja(lojaId) {
        if (!lojaId) {
            throw new Error("ID do produto é obrigatório.");
        }
    
        const loja = await lojaRepository.buscarLoja(lojaId);
        if (!loja) {
            return null; 
        }
        return loja;
    }



}

module.exports = LojaService