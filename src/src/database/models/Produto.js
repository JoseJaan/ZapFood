const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const path = require('path');
dotenv.config();
const database = require(path.resolve("config", "database.js"));

const Produto = database.define('produto', {
    idProduto: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, 
    },
    precoProduto: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    descricaoProduto: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
            len: [15, 150]
        }
    },
    nomeProduto: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            len: [10, 60]
        }
    },
    Loja_idLoja: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'lojas', //referencia a tabela loja
            key: 'id'
        }
    },
    visibilidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[0, 1]] 
        },
        defaultValue: 1,
    },
    categoriaProduto: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            len: [10, 60]
        }
    },
    desconto: {
        type: Sequelize.MEDIUMINT,
        allowNull: true,
    },
    foto: {
        type: Sequelize.STRING(300),
        allowNull: true,
        validate: {
            len: [15, 300]
        }
    },
});

module.exports = Produto;
