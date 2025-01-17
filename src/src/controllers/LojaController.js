const path = require("path");
const lojaService = require("../services/Loja")

class LojaController{

    static async detalharLoja(req,res){
        return res.render('produto')
    }

    static async obterLoja(req,res){
        const lojaId = req.user.id;

        try{
            const lojaData = lojaService.obterLoja(lojaId);

            return res.send({lojaData});
        }
        catch(error){
            console.error(error.message);
            return res.status(400).render("Erro ao cadastrar loja", { error: error.message });
        }
    }
}

module.exports = LojaController