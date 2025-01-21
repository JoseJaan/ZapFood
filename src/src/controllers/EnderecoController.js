const path = require("path");
const enderecoService = require(path.resolve("src", "services", "Endereco.js"));

class EnderecoController{

    static async cadastrarEndereco(req,res){
        return res.render('endereco')
    }

    //Cadastrar endereco
    static async cadastro(req,res){
        const { cidade, CEP, rua, numero, complemento, nome } = req.body;
        console.log("nome no controller",nome)
        //Verifica se o usuário autenticado é um cliente
        if(req.user.tipo != 'cliente'){
            return res.status(403).send('Acesso não autorizado.');
        }

        const idCliente = req.user.id;
        try{
            const novoEndereco = enderecoService.cadastrarEndereco({cidade, CEP, rua, numero, complemento, idCliente, nome})

            return res.status(200).message("Endereco cadastrado com sucesso")
        }
        catch(error){
            console.error(error.message);
            return res.status(400).render("endereco", { error: error.message });
        }
    }

    //Atualizar endereco
    //Nenhum campo é obrigatório
    static async atualizarEndereco(req, res) {
        const {idEndereco} = req.params;
        const idCliente = req.user.id;
        const { cidade, CEP, rua, numero, complemento } = req.body;

        if (req.user.tipo !== "cliente") {
            return res.status(204).send("Acesso não autorizado.");
        }
        try {

            const enderecoAtualizado = await enderecoService.atualizarEndereco(id, {
                cidade,
                CEP,
                rua,
                numero,
                complemento,
                idCliente,
                idEndereco
            });
    
            if (!enderecoAtualizado) {
                return res.status(204).send("Endereco não encontrado.");
            }
    
            return res.status(200).json({ success: true, message: "Endereco atualizado com sucesso.", endereco: enderecoAtualizado });
        } catch (error) {
            console.log(error.message);
            return res
                .status(400)
                .send("Erro ao atualizar endereco");
        }
    }

    //Excluir endereco
    //Se houver vendas com aquele endereco, ele não é efetivamente excluido, e sim desativado
    static async excluirEndereco(req, res) {
        const { idEndereco } = req.params; // ID do endereco a ser excluído
        const idCliente = req.user.id; // ID da loja do usuário autenticado
    
        try {
            const resultado = await enderecoService.excluirEndereco(idEndereco, idCliente);
    
            if (!resultado) {
                return res.status(204).send("Acesso negado ou endereco não encontrado.");
            }
    
            return res.status(200).send("Endereco excluído com sucesso"); 
        } catch (error) {
            console.error(error.message);
            return res
                .status(400)
                .send("Erro ao excluir endereco");
        }
    }

    //Lista todos os enderecos do cliente
    static async listarEnderecos(req, res) {
        const idCliente = req.user.id; 
        const cliente = await enderecoService.obterUsuario(idCliente);
        try {
            const enderecos = await enderecoService.listarEnderecos(idCliente);
            console.log(enderecos)
            return res.render('endereco',{enderecos: enderecos,cliente:cliente});
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Erro ao listar enderecos.");
        }
    }

    //Lista apenas 1 endereco
    static async obterEndereco(req, res) {
        const { idEndereco } = req.params; 
        const idCliente = req.user.id;
    
        try {
            const endereco = await enderecoService.obterEndereco(idEndereco, idCliente);
    
            if (!endereco) {
                return res.status(204).send("Endereco não encontrado ou acesso negado.");
            }
    
            return res.render('endereco',{endereco: endereco})
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Erro ao buscar endereco.");
        }
    }
    
}

module.exports = EnderecoController