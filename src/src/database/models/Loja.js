const path = require("path");
const bcrypt = require('bcryptjs');
const database = require(path.resolve("config", "database.js"));
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
dotenv.config();

const Loja = database.define('loja', {

    id:{
        type: Sequelize.UUID,
        primaryKey : true,
        defaultValue: Sequelize.UUIDV4
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    cnpj:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    horarioFuncionamento:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    nome:{
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
    }


}, {
    hooks: {
            beforeCreate: async (Loja) => {
            try {
                const hashedPassword = await bcrypt.hash(Loja.senha, 10);
                Loja.senha = hashedPassword;
            }
                catch (error) {
                console.error('Erro ao criar usuário:', error);
                }
            }
          }
    })


module.exports = Loja;