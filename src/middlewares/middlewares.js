exports.middlewareGlobal = (req, res, next)=>{
    console.log('Ok Middleware ativo!');
    next();
}