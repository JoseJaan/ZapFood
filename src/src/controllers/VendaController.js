const path = require("path");
const vendaService = require(path.resolve("src", "services", "Venda.js"));
class VendaController{

    static async detalharVenda(req,res){
        return res.render('produto');
    }

    static async obterVenda(req,res){
        const vendaId = req.params;

        try{
            const vendaData = await vendaService.obterVenda(vendaId);
            return res.status(200).send(vendaData);
        }
        catch(error){
            console.error(error.message);
            return res.status(400).send("Erro ao obter dados da venda.");
        }
    }

    static async cadastroVenda(req, res) {
        const { produtos } = req.body;
        const idCliente = req.user.id;

        // Verifica se o tipo do usuário é cliente
        if (req.user.tipo !== 'cliente') {
            return res.status(403).send('Acesso não autorizado.');
        }

        try {
            await vendaService.cadastrarVenda({ produtos, idCliente, lojaId: req.user.lojaId });
            return res.status(201).send('Venda cadastrada com sucesso.');
        } catch (error) {
            console.error(error.message);
            return res.status(400).render('Erro ao cadastrar venda', { error: error.message });
        }
    }

    static async excluirVenda(req, res) {
        const { vendaId } = req.params; // ID da venda a ser excluído
        const lojaId = req.user.id; // ID da loja do usuário autenticado
    
        try {
            const resultado = await vendaService.excluirVenda(vendaId, lojaId);
    
            if (!resultado) {
                return res.status(403).send("Acesso negado ou produto não encontrado.");
            }
    
            return res.status(200); 
        } catch (error) {
            console.error(error.message);
            return res
                .status(400)
                .send("Erro ao a excluir venda");
        }
    }
    
}

module.exports = VendaController