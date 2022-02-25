const HomeModel = require('../models/HomeModel');

HomeModel.create({
    titulo: "titulo de teste.",
    descricao: "descrição de teste."
})
.then(res=> console.log(res))
.catch(e=> console.log(e));

exports.index = (req, res)=>{
    res.render('home')
}