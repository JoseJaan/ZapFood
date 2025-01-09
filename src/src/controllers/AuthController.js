class AuthController{

    static async fazerLogin(req,res){

        return res.render('login');
    }

    static async paginaRegistro(req, res) {
        return res.render("register"); // Renderiza a página de registro
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
            // Tratar erros e retornar mensagens apropriadas
            return res.status(400).render("register", { error: error.message });
        }
    }
}


module.exports = AuthController;