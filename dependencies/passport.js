//handles user authentication
//use passport module
let passport = require("passport");
let LocalStrategy = require('passport-local').Strategy;

module.exports = wagner => {

    wagner.factory("passport", function(User) {

        //Passport-local strategy
        let localStrategy = new LocalStrategy({
            usernameField: "email",
            passwordField: "password"
        }, function(email, password, done) {
            console.log("attemping to authenticate");
            User.findOne({
                    where: {
                        email: email
                    }
                })
                .then(user => {
                    if (!user || !user.validatePassword(password)) {
                        return done(null, false, {
                            message: 'Invalid username or password'
                        });
                    }
                    return done(null, user);
                })
                .catch(done);
        });

        //Attach strategy to passport instance
        passport.use(localStrategy);
        return passport;
    });
};