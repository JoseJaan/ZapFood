const jwt = require('jsonwebtoken');
const path = require("path");
const AuthService = require(path.resolve("src", "services", "Auth.js"));
class AuthController{

    static async fazerLogin(req,res){

        return res.render('login');
    }

    static async registroCliente(req,res){

        return res.render('registroCliente');
    }

    static async registroEmpresa(req,res){
        return res.render('registroEmpresa')
    }

    // Registrar um novo cliente
    static async cadastro(req, res) {  
        const { email, senha, endereco, cpf, idade, nome } = req.body;

        try {
            // Chamar o serviço para registrar o cliente
            const novoCliente = await AuthService.cadastro({ email, senha, endereco, cpf, idade, nome });

            // Redirecionar ou responder em caso de sucesso
            return res.redirect("/login"); // Exemplo: redirecionar para a página de login
        } catch (error) {
            console.log(error.message);
            // Tratar erros e retornar mensagens apropriadas
            return res.status(400).render("registroCliente", { error: error.message });
        }
    }

    //Registrar nova empresa
    static async cadastroEmpresa(req, res) {
        const { email, senha, nome, horarioFuncionamento, cnpj, descricao } = req.body;
        try {
            // Chamar o serviço para registrar a empresa
            const novaEmpresa = await AuthService.cadastroEmpresa({ email, senha, cnpj, nome, horarioFuncionamento, descricao });

            // Redirecionar ou responder em caso de sucesso
            return res.redirect("/login"); // Exemplo: redirecionar para a página de login
        } catch (error) {
            console.log(error.message);
            // Tratar erros e retornar mensagens apropriadas
            return res.status(400).render("registroEmpresa", { error: error.message });
        }
    }

    static async autenticar(req, res) {
        const { email, senha } = req.body;
        console.log(senha)
        try {
            // Autenticar o usuario usando o serviço
            const user = await AuthService.autenticar(email, senha);
            console.log(`tipo no controller autenticar: ${user.tipo}`)
            // Gerar o token JWT
            const token = jwt.sign({ id: user.id, email: user.email, tipo: user.tipo }, process.env.JWT_SECRET, {
                expiresIn: '1h', // Token expira em 1 hora
            });

            // Configurar o cookie com o token
            res.cookie('authToken', token, {
                httpOnly: true, // Impede acesso do JS ao cookie
                secure: process.env.NODE_ENV === 'production', // Somente HTTPS em produção
                sameSite: 'strict', // Protege contra CSRF
                maxAge: 60 * 60 * 1000, // 1 hora
            });

            // Redirecionar para a página principal ou painel
            if(user.tipo == 'loja'){
                return res.redirect('/produto');
            }
            else{
                return res.redirect('/registroCliente');
            }
        } catch (error) {
            console.error(error.message);
            return res.status(401).render('login', { error: error.message });
        }
    }
}


module.exports = AuthController;