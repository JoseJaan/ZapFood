const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize('zapfood', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost', // Ou o IP/URL do seu servidor de banco de dados
    dialect: 'mysql', // Substitua pelo seu banco: 'mysql' | 'postgres' | 'sqlite' | 'mariadb'
  });


  module.exports = sequelize;