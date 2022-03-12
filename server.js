//config files envs
require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');

//connect from database
const mongoose = require('mongoose');
mongoose.connect(process.env.URLDATANASE).then((res)=>{
    app.emit("Pronto");
}).catch(e => console.log(e));

//crear sessions
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

//forms security send
const helmet = require('helmet');
const csrf = require('csurf');
const {middlewareGlobal, checkErrorCsrf, csrfToken} = require('./src/middlewares/middlewares');

// Recebe um corpo de dados na requesição
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(helmet());
const sessionOptions = session({
    secret: '14253607zhda',
    store: MongoStore.create({
        mongoUrl:process.env.URLDATANASE
    }),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(middlewareGlobal);
app.use(checkErrorCsrf)
app.use(csrfToken);
app.use(routes);
app.on('Pronto', ()=>{
    app.listen(3000, ()=>{
        console.log("Servidor Ligado!");
    })
})