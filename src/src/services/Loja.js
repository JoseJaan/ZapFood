const lojaRepository = require("../repository/Loja")

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
            lojaRepository.atualizarCliente({visibilidade: 0})
            return { status: "Cliente excluído com sucesso." };
        }
        lojaRepository.excluirCliente(idLoja);
        return { status: "Cliente excluído com sucesso." };
    }



}

module.exports = LojaService