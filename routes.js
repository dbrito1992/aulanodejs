const express = require('express');
const route = express.Router();
const home = require('./src/controllers/homeController');
const contato = require('./src/controllers/contatoController');

route.get('/', home.index);
route.get('/contato', contato.index);

module.exports = route;