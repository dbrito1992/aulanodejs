require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const conc = require('mongoose');
conc.connect(process.env.URLDATANASE).then((res)=>{
    app.emit("Pronto");
}).catch(e => console.log(e));
const {middlewareGlobal} = require('./src/middlewares/middlewares');
// Recebe um corpo de dados na requesição
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(middlewareGlobal);
app.use(routes);
app.on('Pronto', ()=>{
    app.listen(3000, ()=>{
        console.log("Servidor Ligado!");
    })
})