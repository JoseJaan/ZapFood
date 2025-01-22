const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
    const token = req.cookies.authToken;
    
    if (!token) {
        return res.redirect('/login'); // Redireciona se o token não estiver presente
    }

    
    try {
        const dados = jwt.verify(token, process.env.JWT_SECRET);
        console.log(dados)
        if(dados.tipo == 'loja'){
            return res.redirect("/paginaPrincipalLoja");
        }
        req.user = dados; // Adiciona os dados do usuario à requisição
        next();
    } catch (error) {
        console.error('Erro de autenticação:', error);
        return res.redirect('/login');
    }
}

module.exports = autenticarToken;
