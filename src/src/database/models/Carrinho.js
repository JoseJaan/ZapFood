const path = require("path");
const database = require(path.resolve("config", "database.js"));
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
dotenv.config();

const Carrinho = database.define('carrinho', {
    idUser: {
        type: Sequelize.UUID,
        references: {
            model: 'clientes', 
            key: 'id'
        }
    },
    idProduto:{
        type: Sequelize.UUID,
        references: {
            model: 'produtos', //referencia a tabela loja
            key: 'idProduto'
        }
    }
});

module.exports = Carrinho;
