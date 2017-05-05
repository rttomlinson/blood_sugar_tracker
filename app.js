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




//Shorten helpers for use in auth and routers
const h = helpers.registered;

let forLoggedOut = function(req, res, next) {
    if (req.user) {
        return res.redirect('/');
    }
    next();
};
let forLoggedIn = function(req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
};
//----------------------------
//Routers
//----------------------------

app.use('/records', wagner.invoke(require("./routes/records")));





//create new user
const db = require("./models/sequelize")("seeds");
const User = db.User;
const BSR = db.BloodSugarRecord;
const sequelize = db.sequelize;



app.get(h.loginPath(), function(req, res, next) {
    res.render("sessions/new");
});

//Be aware that the home path is located in the users_helper file
app.get('/', function(req, res, next) {
    res.redirect(h.homePath());
});
app.get(h.homePath(), function(req, res, next) {
    let user = req.user;

    res.locals.currentUser = req.user;

    res.render("users/show");
});

app.get(h.newUserPath(), function(req, res, next) {
    res.render('users/new');
});

app.post(h.newUserPath(), function(req, res, next) {
    let user;
    const userParams = {
        email: req.body.user.email,
        hashedPassword: req.body.user.password
    };
    //first create the user
    sequelize.transaction((t) => {
        return User.create(userParams, {
                transaction: t
            })
            // .spread(result => {
            //     user = result;
            //     //now create initial purse for this user
            //     // return Purse.create({
            //     //     user_id: user.id
            //     // }, {
            //     //     transaction: t
            //     // });
            // })
            .then((result) => {
                user = result;
                req.login(user, err => {
                    return err ? next(err) : res.redirect('/');
                });
            })
            .catch(next);
    });
});

app.get('/user/stats', (req, res) => {
    console.log("inside stats path");
    //We want to get all the medical info
    //Only have bloodsugars for now
    // BSR.getAllBloodSugarForUser(req.user.id)
    // .then(bloodSugars => {
    //     console.log("all bloodSugars", bloodSugars);
    //     res.end("We got em!");
    // });
    // BSR.getLastFiftyBloodSugarForUser(req.user.id)
    // .then(bloodSugars => {
    //     console.log("all bloodSugars", bloodSugars.length);
    //     res.end("We got em!");
    // });
    // BSR.getBloodSugarInLast24Hours(req.user.id)
    // .then(bloodSugars => {
    //     console.log("all bloodSugars", bloodSugars);
    //     res.end("We got em!");
    // });
    BSR.getAverageBloodSugarInLast24Hours(req.user.id)
    .then(bloodSugars => {
        console.log("all bloodSugars", bloodSugars);
        res.end("We got em!");
    });
});

app.get(h.profilePath, (req, res) => {
    //We want to get all the information about the user and display
    res.end("Profile path");
});








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
