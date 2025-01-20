const path = require("path");
const bcrypt = require('bcryptjs');
const database = require(path.resolve("config", "database.js"));
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
dotenv.config();

const Venda = database.define('venda', {

    id:{
        type: Sequelize.UUID,
        primaryKey : true,
        defaultValue: Sequelize.UUIDV4
    },
    data:{
        type: Sequelize.DATE,
        allowNull: false,
    },
    visibilidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {                 // Visibilidade 0 = invisível
            isIn: [[0, 3]]          // Visibilidade 1 = visível para loja e cliente
        },                          // Visibilidade 2 = visível para loja
        defaultValue: 1,            // Visibilidade 3 = visível para cliente
    },          
    idCliente:{
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'clientes', //referencia a tabela loja
            key: 'id'
        }
    }


},)


module.exports = Venda;