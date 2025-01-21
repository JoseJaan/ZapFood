const enderecoRepository = require("../repository/Endereco")

class EnderecoService{

    //Cadastra o endereco
    static async cadastrarEndereco(enderecoData){
        const { rua, numero, CEP, complemento, cidade, idCliente} = enderecoData;

        if (!rua || !numero || !CEP || !complemento || !cidade || !idCliente) {
            throw new Error("Todos os campos são obrigatórios");
        }

        const novoProduto = await enderecoRepository.cadastrarEndereco(enderecoData);

        return enderecoData;
    }

    //Atualiza o produto
    //Nenhum campo é obrigatório
    static async atualizarProduto(idEndereco, enderecoData) {
        if (!idEndereco) {
            throw new Error("ID do endereco é obrigatório.");
        }
    
        const camposValidos = ["rua", "CEP", "numero", "cidade", "complemento"];
        const dadosFiltrados = {};
    
        //Seleciona apenas os campos enviados
        camposValidos.forEach((campo) => {
            if (produtoData[campo] !== undefined) {
                dadosFiltrados[campo] = produtoData[campo];
            }
        });
    
        if (Object.keys(dadosFiltrados).length === 0) {
            throw new Error("Nenhum campo para atualizar foi enviado.");
        }
        const idCliente = enderecoData.idCliente;
        const endereco = await enderecoRepository.buscarEndereco({ idEndereco, idCliente, visibilidade: 1 });

        if (!endereco || endereco.idCliente !== enderecoData.idCliente) {
            return null; // Endereci não encontrado ou não pertence à loja
        }
    
        const enderecoAtualizado = await enderecoRepository.atualizarEndereco(id, dadosFiltrados);
    
        return enderecoAtualizado;
    }

    //Excluir endereco
    //Se houver vendas com aquele endereco, ele não é efetivamente excluido, e sim desativado
    static async excluirProduto(idEndereco, idCliente) {
        if (!idEndereco) {
            throw new Error("ID do endereco é obrigatório.");
        }
    
        // Busca o endereco pelo ID e valida se ele pertence ao cliente
        const endereco = await enderecoRepository.buscarProduto({ idEndereco, idCliente, visibilidade: 1 });

        if (!endereco || endereco.idCliente !== idCliente) {
            return null; // Endereco não encontrado ou não pertence ao cliente
        }
    
        // Verifica se o endereco está associado a uma venda
        const enderecoEmVenda = await enderecoRepository.verificarEnderecoEmVenda(idEndereco);
    
        if (enderecoEmVenda) {
            // Se estiver em uma venda, altera a visibilidade
            await enderecoRepository.atualizarEndereco(idEndereco, { visibilidade: 0 });
            return { status: "Endereco encontrado em vendas, exclusão não permitida. Visibilidade alterada." };
        } else {
            // Se não estiver, exclui o produto
            await enderecoRepository.excluir(idEndereco);
            return { status: "Endereco excluído com sucesso." };
        }
    }

    //Lista todos os enderecos de uma loja
    static async listarEnderecos(idCliente) {
        if (!idCliente) {
            throw new Error("ID do cliente é obrigatório.");
        }
    
        const enderecos = await enderecoRepository.listarPorCliente(idCliente);
    
        return enderecos;
    }

    //Lista apenas 1 endereco da loja
    static async obterEndereco(idEndereco) {
        if (!idEndereco) {
            throw new Error("ID do endereco é obrigatório.");
        }
    
        const endereco = await enderecoRepository.buscarEndereco({ idEndereco, visibilidade: 1 });
    
        if (!endereco) {
            return null; 
        }
    
        return endereco;
    }

    static async obterUsuario(idEndereco) {

        const usuario = await enderecoRepository.buscarUsuario(idEndereco);

        if(usuario){
            return usuario;
        }
        return null;
    }
    

}

module.exports = EnderecoService