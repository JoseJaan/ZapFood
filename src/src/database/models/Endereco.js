const path = require("path");
const database = require(path.resolve("config", "database.js"));
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
dotenv.config();

const Endereco = database.define('endereco', {

    idEndereco: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, 
    },
    idCliente:{
        type: Sequelize.UUID,
        primaryKey : true,
        references: {
            model: 'clientes', //referencia a tabela clientes
            key: 'id'
        }
    },
    idEndereco:{
        type: Sequelize.UUID,
        primaryKey : true,
        references: {
            model: 'enderecos', //referencia a tabela enderecos
            key: 'idEndereco'
        }
    },
    cidade:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    CEP:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    rua:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    numero:{
        type: Sequelize.MEDIUMINT,
        allowNull: false,
    },
    complemento:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    visibilidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[0, 1]] 
        },
        defaultValue: 1,
    },
})


module.exports = Endereco;