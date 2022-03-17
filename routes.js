const express = require('express');
const route = express.Router();
const home = require('./src/controllers/homeController');
const login = require('./src/controllers/loginController');
const contato = require('./src/controllers/contatoController');

const { loginRequired} = require('./src/middlewares/middlewares');

// Rotas HomePage
route.get('/', home.index);

// Rotas Login
route.get('/login/index', login.index);
route.post('/login/register', login.register);
route.post('/login/login', login.login);
route.get('/login/logout', login.logout);

// Rotas Contatos
route.get('/contato/index', loginRequired, contato.index);
route.post('/contato/register', loginRequired, contato.register);
route.get('/contato/index/:id', loginRequired, contato.editContato);
route.post('/contato/edit/:id', loginRequired, contato.edit);
route.get('/contato/delete/:id', loginRequired, contato.delete);

module.exports = route;