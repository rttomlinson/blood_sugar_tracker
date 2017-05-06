const express = require("express");
const app = express();
const wagner = require("wagner-core");

//-----------------------
//Set Environment Variables if Necessary
//-----------------------
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const helpers = require('./helpers');
wagner.factory("helpers", function() {
    return helpers;
});

require("./models/sequelize/")(wagner);
//get passport
require("./services/passport")(wagner);


// ----------------------------------------
// Body Parser
// ----------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

//--------------------
//Express session
//--------------------
const expressSession = require("express-session");
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {}
}));


// ----------------------------------------
// Public
// ----------------------------------------
app.use(express.static(`${ __dirname }/public`));

// ----------------------------------------
// Referrer
// ----------------------------------------
app.use((req, res, next) => {
    req.session.backUrl = req.header('Referer') || '/';
    next();
});


// ----------------------------------------
// Template Engine
// ----------------------------------------
const expressHandlebars = require('express-handlebars');

const hbs = expressHandlebars.create({
    helpers: helpers.registered,
    partialsDir: 'views/',
    defaultLayout: 'main'
});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// ----------------------------------------
// Method Override
// ----------------------------------------
app.use((req, res, next) => {
    let method;
    if (req.query._method) {
        method = req.query._method;
        delete req.query._method;
        for (let key in req.query) {
            req.body[key] = decodeURIComponent(req.query[key]);
        }
    }
    else if (typeof req.body === 'object' && req.body._method) {
        method = req.body._method;
        delete req.body._method;
    }

    if (method) {
        method = method.toUpperCase();
        req.method = method;
    }

    next();
});



// ----------------------------------------
// Services
// ----------------------------------------
wagner.invoke(require('./services/auth'), {
    app: app
});

const h = helpers.required;
//----------------------------
//Routers
//----------------------------

app.use('/records', wagner.invoke(require("./routes/records")));

app.use('/user', wagner.invoke(require("./routes/users")));


//Be aware that the home path is located in the users_helper file
app.get('/', function(req, res, next) {
    res.redirect(h.homePath());
});
// ----------------------------------------
// Destroy
// ----------------------------------------
const onDestroy = (req, res) => {
    // Delete all keys and
    // redirect
    req.session.destroy();
    req.method = 'GET';
    res.redirect(h.loginPath());
};
app.get('/logout', onDestroy);
app.delete('/logout', onDestroy);
app.delete('/sessions', onDestroy);

// ----------------------------------------
// Server
// ----------------------------------------
const port = process.env.PORT ||
    process.argv[2] ||
    3000;
const host = 'localhost';


let args;
process.env.NODE_ENV === 'production' ?
    args = [port] :
    args = [port];

args.push(() => {
    console.log(`Listening: http://${ host }:${ port }\n`);
});


// If we're running this file directly
// start up the server
if (require.main === module) {
    app.listen.apply(app, args);
}


// ----------------------------------------
// Error Handling
// ----------------------------------------
app.use('/api', (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err.stack) {
        err = err.stack;
    }
    res.status(500).json({
        error: err
    });
});


app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err.stack) {
        err = err.stack;
    }
    res.status(500).render('errors/500', {
        error: err
    });
});

module.exports = app;
