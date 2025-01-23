const clienteRepository = require("../repository/Cliente");
const vendaRepository = require("../repository/Venda");
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

    static async deletarCliente(idCliente){
        const vendas = await vendaRepository.buscarVendaPorId(idCliente);

        if(vendas){
            clienteRepository.atualizarCliente({visibilidade: 0})
            return { status: "Cliente excluído com sucesso." };
        }
        clienteRepository.excluirCliente(idCliente);
        return { status: "Cliente excluído com sucesso." };
    }

}

module.exports = ClienteService;