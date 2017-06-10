//try to auth by bearer (JWT, not yet in use)
//try to auth by username as password
const url = require("url");

module.exports = (User, passport, helpers, app, sequelize) => {
    //Shorten helpers for use in auth and routers
    const h = helpers.registered;
    //start passport service
    app.use(passport.initialize());
    //if user is already logged in then req.user should be set

    //if trying to access api path, check for token
    app.use('/api', function(req, res, next) {
        let token = req.query.token || req.body.token;
        console.log("grabbing token", token);
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

    //------------------------------
    //User login/token
    //-----------------------------
    
    // ----------------------------------------
    // Login Handler
    // ----------------------------------------
    app.post('/auth/login', passport.authenticate("local", {
                    session: false
                }), (req, res, next) => {
        //need to create jwt token now sending only the id to the browser
        console.log("passed to callback");
        res.json(req.user);
    });

    //------------------------------------------------------------------//

    //------------------------------
    //User Registration
    //------------------------------

    app.post('/auth/register', function(req, res, next) {
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



//EXPLORE THESE OPTIONS LATER

    // let options = {
    //     findUserByEmail: (email) => {
    //         return User.findOne({
    //             email: email
    //         });
    //     },
    //     findUserByToken: (token) => {
    //         return User.findOne({
    //             token: token
    //         });
    //     },
    //     validateUserPassword: (user, password) => {
    //         return user.validatePassword(password);
    //     }
    // };


    // const _options = {
    //     loginUrl: '/login',
    //     rootUrl: '/',
    //     loginView: 'sessions/new',
    //     unauthenticatedPaths: [
    //         '/login',
    //         '/user/new',
    //         '/'
    //     ]
    // };


    // Register options
    // for (let key in options) {
    //     _options[key] = options[key];
    // }
