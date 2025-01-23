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

    static async editarPerfil(nome,cpf,idade, userId){
        if(cpf.length != 11 ){
            throw new Error("CPF invalido");
        }

        if(nome.lenght > 100){
            throw new Error("Nome muito grande");
        }

        await clienteRepository.editarPerfil(nome,cpf,idade, userId);

    }

}

module.exports = ClienteService;