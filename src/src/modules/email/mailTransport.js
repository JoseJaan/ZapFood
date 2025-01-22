const nodemailer = require('nodemailer')
//Configuração do Nodemailer
//Utiliza o serviço do gmail
//A senha da conexão deve ser gerada nas configurações do email utilizado, em 'Senhas de App'. (Considerando um email com domínio @gmail.com)
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = transport