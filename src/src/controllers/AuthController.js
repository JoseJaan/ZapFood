class AuthController{

    static async fazerLogin(req,res){

        return res.render('login');
    }

    static async registroCliente(req,res){

        return res.render('registroCliente');
    }


}

module.exports = AuthController;