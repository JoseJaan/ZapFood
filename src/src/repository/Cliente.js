const Cliente = require("../database/models/Cliente.js");
const Loja = require("../database/models/Loja.js")
const Produto = require("../database/models/Produto.js");


class ClienteRepository{

    static async buscarProdutosPromocao(){
        const maioresDescontos = await Produto.findAll({
            order: [['desconto', 'DESC']],
            limit: 4,
          });

          console.log(maioresDescontos)
          return maioresDescontos;
    }

    static async buscarLojasPopulares(){
        const lojas = await Loja.findAll({
            limit: 4,
        });

        return lojas;

    }



}

module.exports = ClienteRepository;