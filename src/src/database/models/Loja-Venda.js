const path = require("path");
const bcrypt = require('bcryptjs');
const database = require(path.resolve("config", "database.js"));
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const Venda = require("./Venda-Produto");
dotenv.config();

const empresaVenda = database.define('empresa_has_venda', {

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
        validate: {                 // Visibilidade 0 = invisível
            isIn: [[0, 3]]          // Visibilidade 1 = visível para loja e cliente
        },                          // Visibilidade 2 = visível para loja
        defaultValue: 1,            // Visibilidade 3 = visível para cliente
    },
    empresaId:{
        type: Sequelize.DATE,
        allowNull: false,
        references: {
            model: 'lojas', //referencia a tabela loja
            key: 'id'
        }
    },

},)


module.exports = empresaVenda;