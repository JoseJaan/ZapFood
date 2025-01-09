const path = require("path");
const AuthService = require(path.resolve("src", "services", "Auth.js"));
class AuthController{

    static async fazerLogin(req,res){

        return res.render('login');
    }

    static async registroCliente(req,res){

        return res.render('registroCliente');
    }


    // Registrar um novo cliente
    static async cadastro(req, res) {  
        console.log(req.body);
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
}


module.exports = AuthController;