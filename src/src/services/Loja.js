const lojaRepository = require("../repository/Loja")
const path = require("path");
const cloudinary = require(path.resolve("config", "cloudinary"));
class LojaService{

    static async obterLoja(lojaId) {
        if (!lojaId) {
            throw new Error("ID da loja é obrigatório.");
        }
    
        const loja = await lojaRepository.buscarLoja(lojaId);
        if (!loja) {
            return null; 
        }
        return loja;
    }
    
    static async deletarLoja(idLoja){
        const vendas = await vendaRepository.buscarVendaPorId(idLoja);

        if(vendas){
            lojaRepository.atualizarLoja({visibilidade: 0})
            return { status: "Loja excluído com sucesso." };
        }
        lojaRepository.excluirLoja(idLoja);
        return { status: "Loja excluído com sucesso." };
    }

    static async mudarImagem(caminho, userId){
        const imagem = await cloudinary.uploader.upload(caminho, {
                      folder: "uploads",
                    });
        await lojaRepository.mudarImagem(imagem,userId);
    }
}

module.exports = LojaService