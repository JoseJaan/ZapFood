const path = require("path");
const clienteRepository = require("../repository/Cliente");
const vendaRepository = require("../repository/Venda");
const cloudinary = require(path.resolve("config", "cloudinary"));

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
    static async editarPerfil(nome,cpf,idade, userId){
        if(cpf.length != 11 ){
            throw new Error("CPF invalido");
        }

        if(nome.lenght > 100){
            throw new Error("Nome muito grande");
        }

        await clienteRepository.editarPerfil(nome,cpf,idade, userId);
    }
    
    static async mudarImagem(caminho, userId){
        const imagem = await cloudinary.uploader.upload(caminho, {
                      folder: "uploads",
                    });
        await clienteRepository.mudarImagem(imagem,userId);
    }
}

module.exports = ClienteService;