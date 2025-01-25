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
    
    static async atualizarLoja(idLoja, data){
        try {
            const loja = await Loja.findByPk(idLoja);
            if (!loja) {
                return null;
            }
            await loja.update(data); // Atualiza qualquer campo fornecido
            return loja;
        } catch (error) {
            console.error("Erro ao atualizar loja:", error);
            throw new Error("Erro ao atualizar loja no banco de dados.");
        }
    }

    static async excluirLoja(idLoja){
        try {
            await Loja.destroy({ where: { idLoja } });
        } catch (error) {
            console.error("Erro ao excluir loja:", error);
            throw new Error("Erro ao excluir loja do banco de dados.");
        }      
    }

    static async mudarImagem(imagem, userId){
        const loja = await Loja.findByPk(userId);
        loja.img = imagem.url;
        loja.save();
 
     }


}

module.exports = LojaRepository;