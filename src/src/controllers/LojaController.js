const path = require("path");
const lojaService = require(path.resolve("src", "services", "Loja.js"));
class LojaController{

    static async detalharLoja(req,res){
        return res.render('produto')
    }

    static async obterLoja(req,res){
        const lojaId = req.user.id;

        try{
            const lojaData = await lojaService.obterLoja(lojaId);
            return res.status(200).send(lojaData);
        }
        catch(error){
            console.error(error.message);
            return res.status(400).send("Erro ao obter loja");
        }
    }
}

module.exports = LojaController