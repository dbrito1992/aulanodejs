const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator');

const ContatoSchema = mongoose.Schema({
    nome:{type: String, required: true},
    sobrenome:{type: String, required: false, default: ''},
    telefone:{type: String, required: false, default: ''},
    email:{type: String, required: false, default: ''},
    criado_em:{type: Date, default: Date.now}
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body){
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.busrcarPorId = async function(id){
    if(typeof id !== 'string') return;
    const user = await ContatoModel.findById(id);
    return user;
}

Contato.prototype.register = async function(){
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.valida = function(){
    this.cleanUp();
    // Valida email
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Error: Este email não e válido!')
    // Valida Algum tipo de contato
    if(!this.body.nome) this.errors.push('Campo NOME é obrigatorio');
    if(!this.body.email && !this.body.telefone){
        this.errors.push('Informe pelo menos um contato: E-mail ou Telefone!');
    } 
    
}

Contato.prototype.cleanUp = function(){
    for(const key in this.body){
        if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
        }
    }

    this.body = {
        nome : this.body.nome,
        sobrenome : this.body.sobrenome,
        telefone : this.body.telefone,
        email : this.body.email
    }
}

module.exports = Contato;