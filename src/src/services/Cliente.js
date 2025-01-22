const clienteRepository = require("../repository/Cliente");

class ClienteService{

    //Cadastra o endereco
    static async maioresPromocoes(enderecoData){
        const produtos = await clienteRepository.buscarProdutosPromocao();
    
        if(!produtos){
            return null;
        }

        return produtos;
    }

    static async lojasPopulares(){
        const lojas = await clienteRepository.buscarLojasPopulares();

        if(!lojas){
            return null;
        }

        return lojas;

    }

}

module.exports = ClienteService;