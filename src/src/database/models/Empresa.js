const path = require("path");
const bcrypt = require('bcryptjs');
const database = require(path.resolve("config", "database.js"));
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
dotenv.config();

const Empresa = database.define('empresa', {

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
    }


}, {
    hooks: {
            beforeCreate: async (Empresa) => {
            try {
                const hashedPassword = await bcrypt.hash(Empresa.senha, 10);
                Empresa.senha = hashedPassword;
            }
                catch (error) {
                console.error('Erro ao criar usuário:', error);
                }
            }
          }
    })


module.exports = Empresa;