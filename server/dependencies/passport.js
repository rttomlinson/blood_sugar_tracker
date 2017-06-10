//handles user authentication
//use passport module
let passport = require("passport");
let LocalStrategy = require('passport-local').Strategy;
//JWT **Basic set up but not in use. Tests not available**
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const jwtParams = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromBodyField(), ExtractJwt.fromUrlQueryParameter()])
};

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

        //JWT **Not currently utilized**
        let jwtStrategy = new JWTStrategy(jwtParams, function(payload, done) {
            User.findOne({
                    where: {
                        id: payload.id
                    }
                })
                .then(user => {
                    if (!user) {
                        return done(null, false, new Error('User not found'));
                    }
                    return done(null, user);
                })
                .catch(done);
        });
        passport.use(jwtStrategy);

        return passport;
 
    });



};
