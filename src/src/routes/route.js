const path = require('path');
const express = require('express');
const Auth = require(path.resolve("src","routes","CRUD","Auth"));
const Produto = require(path.resolve("src","routes","CRUD","Produto"));



const routes = (app) => {

// Define o EJS como mecanismo de visualização
    app.set('view engine', 'ejs');

    app.use(express.static(path.resolve('public')));

    app.set('views', path.resolve('src','views')); 

    app.use(express.urlencoded({ extended: true })); 

    app.use(Auth);

    app.use(Produto)


};


module.exports = routes