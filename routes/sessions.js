const express = require("express");
const router = express.Router();


module.exports = (User, sequelize, BloodSugarRecord, helpers) => {
    const BSR = BloodSugarRecord;
    const h = helpers.registered;
    router.get(h.loginPath(), function(req, res, next) {
        res.render("sessions/new");
    });

    //Be aware that the home path is located in the users_helper file
    router.get('/', function(req, res, next) {
        res.redirect(h.homePath());
    });
    router.get(h.homePath(), function(req, res, next) {
        res.render("users/show");
    });

    router.get(h.newUserPath(), function(req, res, next) {
        res.render('users/new');
    });

    router.post(h.newUserPath(), function(req, res, next) {
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




    return router;
};
