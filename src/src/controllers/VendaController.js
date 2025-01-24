const path = require("path");
const vendaService = require(path.resolve("src", "services", "Venda.js"));
const carrinhoService = require(path.resolve("src", "services", "Carrinho.js"));
const enderecoService = require(path.resolve("src", "services", "Endereco.js"));
const lojaService = require(path.resolve("src", "services", "Loja.js"));

class VendaController{

    static async detalharVenda(req, res) {
        try {
            const loja = await lojaService.obterLoja(req.user.id);
            const vendas = await vendaService.obterVendas(req.user.id);
    
            // Calcula o total das vendas somando os valores dos produtos
            const totalVendas = vendas.reduce((total, venda) => {
                const totalVenda = venda.produtos.reduce((subtotal, produto) => {
                    return subtotal + produto.precoProduto; 
                }, 0);
                return total + totalVenda;
            }, 0);
    
            return res.render('vendas', { loja, vendas, totalVendas });
        } catch (error) {
            console.error(error);
            res.status(500).send(`Erro ao detalhar vendas: ${error.message}`);
        }
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
        try {
            const produtos  = await carrinhoService.buscarProdutosCarrinho(req.user.id);
            const idCliente = req.user.id;
            let enderecoId;
            if(req.body.endereco){
                enderecoId = req.body.endereco;
                await vendaService.cadastrarVenda(idCliente,produtos,enderecoId);
            }
            else{
                const dados = {rua: req.body.rua,
                    numero: req.body.numero,
                    CEP: req.body.CEP,
                    complemento: req.body.complemento,
                    cidade: req.body.cidade,
                    idCliente: req.user.id, // Use uma chave que faça sentido, como `userId`
                    nome: req.body.nome}
                    const endereco = await enderecoService.cadastrarEndereco(dados);
                    await vendaService.cadastrarVenda(idCliente,produtos,endereco.idEndereco);
            }
            await carrinhoService.esvaziarCarrinho(req.user.id);
            return res.redirect('/paginaPrincipalCliente')
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

    static async atualizarVenda(req, res) {
        const {idVenda, idVendaProduto} = req.params;
        const lojaId = req.user.id;
        if (req.user.tipo !== "loja") {
            return res.status(403).send("Acesso não autorizado.");
        }
        try {

            const vendaAtualizada = await vendaService.atualizarVenda(idVenda,idVendaProduto,lojaId);
    
            if (!vendaAtualizada) {
                return res.status(204).send("Venda não encontrado.");
            }
    
            return res.status(200).json({ success: true, message: "Venda atualizado com sucesso.", venda: vendaAtualizada });
        } catch (error) {
            console.log(error.message);
            return res.status(400).send("Erro ao atualizar venda");
        }
    }
    
}

module.exports = VendaController