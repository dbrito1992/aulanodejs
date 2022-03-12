const express = require('express');
const route = express.Router();
const home = require('./src/controllers/homeController');
const login = require('./src/controllers/loginController');

// Rotas HomePage
route.get('/', home.index);

// Rotas Login
route.get('/login/index', login.index);
route.post('/login/register', login.register);

module.exports = route;