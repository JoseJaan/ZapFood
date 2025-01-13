const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login'); // Redireciona se o token não estiver presente
    }

    try {
        const dados = jwt.verify(token, process.env.JWT_SECRET);
        req.cliente = dados; // Adiciona os dados do cliente à requisição
        next();
    } catch (error) {
        console.error('Erro de autenticação:', error);
        return res.redirect('/login');
    }
}

module.exports = autenticarToken;
