const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');


const LoginSchema = mongoose.Schema({
    email:{type: String, required: true},
    senha:{type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register(){

        this.valida();
        if(this.errors.length > 0) return;

        await this.userExist();
        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

        try{
            const user = await LoginModel.create(this.body);
        }catch(e){
            console.log(e);
        }
        
    }

    async userExist(){
       const user = await LoginModel.findOne({email: this.body.email});
       if(user) this.errors.push('Está conta já existe...');
    }

    valida(){
        this.cleanUp();
        // Valida email
        if(!validator.isEmail(this.body.email)) this.errors.push('Error: Este email não e válido!')
        // Valida Senha
        if(this.body.senha.length < 3 || this.body.senha.length > 50) {
            this.errors.push('Error: Senha tem que ter entre 3 a 50 caracteres!')
        }
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body = {
            email : this.body.email,
            senha : this.body.senha
        }
    }
}

module.exports = Login;