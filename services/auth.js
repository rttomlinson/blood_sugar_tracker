//try to auth by bearer
//try to auth by username as password
const url = require("url");

module.exports = (User, passport, helpers, app, sequelize) => {
    //Shorten helpers for use in auth and routers
    const h = helpers.registered;
    let options = {
        findUserByEmail: (email) => {
            return User.findOne({
                email: email
            });
        },
        findUserByToken: (token) => {
            return User.findOne({
                token: token
            });
        },
        validateUserPassword: (user, password) => {
            return user.validatePassword(password);
        }
    };


    const _options = {
        loginUrl: '/login',
        rootUrl: '/',
        loginView: 'sessions/new',
        unauthenticatedPaths: [
            '/login',
            '/user/new',
            '/'
        ]
    };


    // Register options
    for (let key in options) {
        _options[key] = options[key];
    }


    //start passport service and session
    app.use(passport.initialize());
    // app.use(passport.session());
    //if user is already logged in then req.user should be set
    //-------------------
    //Set res.locals.currentUser for access in templates
    //-------------------

    app.use((req, res, next) => {
        if (req.user) res.locals.currentUser = req.user;
        next();
    });

    //if trying to access api path, check for token
    app.use('/api', function(req, res, next) {
        let token = req.query.token || req.body.token;
        if (!token) {
            res.status(401).json({
                error: "Unauthorized"
            });
            return;
        }
        User.findByToken(token)
            .then((user) => {
                if (!user) {
                    //custom error page or flash message
                    return next(new Error("No user by that token"));
                }
                req.user = user;
                next();
            });

    });


    // ----------------------------------------
    // Require Login/Logout
    // ----------------------------------------
    app.use((req, res, next) => {
        const reqUrl = url.parse(req.url).pathname;

        // Is the user logged in?
        const isLoggedIn = !!req.user;

        // Is this an authenticated route?
        const isAuthenticatedPath = !_options
            .unauthenticatedPaths
            .includes(reqUrl);

        // User can proceed if
        const canProceed =
            // They are logged in and route
            // is authenticated or
            (isLoggedIn && isAuthenticatedPath) ||

            // The path is unauthenticated
            !isAuthenticatedPath;

        // Redirect if cannot proceed
        canProceed ? next() : res.redirect(_options.loginUrl);
    });


    //------------------------------
    //User login
    //-----------------------------
    // const onNew = (req, res) => {

    //     // Redirect to root if already logged in
    //     req.user ?
    //         res.redirect(h.rootPath()) :
    //         res.render("sessions/new");
    // };
    // app.get('/login', onNew);

    //define strategy for login with local auth
    let newSessionStrat = passport.authenticate("local", {
        session: false
    });
    // ----------------------------------------
    // Login Handler
    // ----------------------------------------
    app.post('/login', newSessionStrat, (req, res, next) => {
        res.json(req.user);
    });

    //------------------------------------------------------------------//

    //------------------------------
    //User Registration
    //------------------------------
    // app.get(h.newUserPath(), function(req, res, next) {
    //     res.render('users/new');
    // });

    app.post(h.newUserPath(), function(req, res, next) {
        let user;
        const {
            email,
            password,
            passwordconfirm
        } = req.body;
        //TODO: Valid that passwords match
        if (password !== passwordconfirm) {
            console.error("password not matching, about user creation");
        }
        const userParams = {
            email,
            hashedPassword: password
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
                    res.status(201).json(user);
                })
                .catch(next);
        });
    });

};
