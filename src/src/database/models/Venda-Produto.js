const path = require("path");
const bcrypt = require('bcryptjs');
const database = require(path.resolve("config", "database.js"));
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
dotenv.config();

const vendaProd = database.define('venda_has_prod', {

    vendaId:{
        type: Sequelize.UUID,
        primaryKey : true,
        defaultValue: Sequelize.UUIDV4,
        references: {
            model: 'vendas', //referencia a tabela loja
            key: 'id'
        }
    },
    visibilidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {             // Visibilidade 0 = invisível
            isIn: [[0, 3]]      // Visibilidade 1 = visível para loja e cliente
        },                      // Visibilidade 2 = visível para loja
        defaultValue: 1,        // Visibilidade 3 = visível para cliente
    },
    produtoId:{
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'produtos', //referencia a tabela loja
            key: 'id'
        }
    },

},)


module.exports = vendaProd;