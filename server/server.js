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

//Add models and sequelize to wagner
require('./dependencies/sequelize')(wagner);
//Add passport
require('./dependencies/passport')(wagner);

// ----------------------------------------
// Body Parser
// ----------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//--------------------------
//Logger
//--------------------------
const logger = require('morgan');
app.use(logger('dev'));

//---------------------------------------
//Set response headers for CORS
//---------------------------------------
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


// ----------------------------------------
// Public
// ----------------------------------------
app.use(express.static(`${ __dirname }/public`));

// ----------------------------------------
// Referrer
// ----------------------------------------
// app.use((req, res, next) => {
//     req.session.backUrl = req.header('Referer') || '/';
//     next();
// });


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

const h = helpers.registered;
//----------------------------
//Routers
//----------------------------

// app.use('/records', wagner.invoke(require("./routes/records")));

app.use('/api/user/', wagner.invoke(require("./routes/users")));

//Provide path for checking if the server is running
app.get('/', function(req, res, next) {
    res.status(200).end("Server is up!");
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

// ----------------------------------------
// Server
// ----------------------------------------
let port;
if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'test') {
    port = 8081;
} else {
    port = process.env.PORT || 8080;
}
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
    console.error("err stack", err.stack);
    if (res.headersSent) {
        return next(err);
    }

    if (err.stack) {
        err = err.stack;
    }
    res.status(500).json({
        error: err.message
    });
});

module.exports = app;
