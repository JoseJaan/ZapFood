class AuthController{

    static async fazerLogin(req,res){

        return res.render('login');
    }


}

module.exports = AuthController;