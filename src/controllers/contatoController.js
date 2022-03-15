const { async } = require('regenerator-runtime');
const Contato = require('../models/ContatoModel');

exports.index = (req, res) =>{
    res.render('contato', {
        contato: new Array()
    });
}

exports.register = async (req, res)=>{
    try{
        const contato = new Contato(req.body);
        await contato.register();
        
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(()=> res.redirect('/contato/index'));
            return;
        }
        if(!contato.errors.length){
            req.flash('success', 'Contato cadastrado com sucesso!');
            req.session.save(()=> res.redirect(`/contato/index/${contato.contato._id}`));
            return;
        }

    }catch(e){
        console.log(e);
        return res.render('404');
    }
}

exports.editContato = async (req, res) =>{
    if(!req.params.id) return res.render('404');
    const contato = await Contato.busrcarPorId(req.params.id);
    if(!contato) return res.render('404');
    res.render('contato', {contato});
}