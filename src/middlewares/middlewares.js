exports.middlewareGlobal = (req, res, next)=>{
    res.locals.links = {
        home: "/",
        contato: "/contato"
    };
    next();
}

exports.checkErrorCsrf = (err, req, res , next)=>{
    if(err && 'EBADCSRFTOKEN' === err.code){
        return res.render('404');
    }
}

exports.csrfToken = (req, res, next)=>{
    res.locals.csrfToken = req.csrfToken();
    next();
}