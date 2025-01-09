const path = require("path");
const database = require(path.resolve("config", "database.js"));
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
dotenv.config();

const Cliente = database.define('cliente', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Gera automaticamente um UUID
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    idade: {
        type: Sequelize.MEDIUMINT,
        allowNull: false,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    hooks: {
        beforeCreate: async (Cliente) => {
            try {
                const hashedPassword = await bcrypt.hash(Cliente.senha, 10);
                Cliente.senha = hashedPassword;
            } catch (error) {
                console.error('Erro ao criar usuário:', error);
            }
        }
    }
});

module.exports = Cliente;
