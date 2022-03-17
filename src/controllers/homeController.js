const Contato = require('../models/ContatoModel');

exports.index = async (req, res)=>{
    const contatos = await Contato.busrcarContatos();
    res.render('home', { contatos });
}