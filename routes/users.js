const express = require("express");
const router = express.Router();


module.exports = (User, sequelize, BloodSugarRecord, Profile, helpers) => {
    const BSR = BloodSugarRecord;
    const h = helpers.registered;
    router.get('/stats', (req, res, next) => {
        //We want to get all the medical info
        //Only have bloodsugars for now
        // BSR.getAllBloodSugarForUser(req.user.id)
        // .then(bloodSugars => {
        //     console.log("all bloodSugars", bloodSugars);
        //     res.end("We got em!");
        // });
        let bloodSugarInfo = [];
        bloodSugarInfo.push(BSR.getLastFiftyBloodSugarForUser(req.user.id));
        bloodSugarInfo.push(BSR.getBloodSugarInLast24Hours(req.user.id));
        bloodSugarInfo.push(BSR.getAverageBloodSugarInLast24Hours(req.user.id));
        Promise.all(bloodSugarInfo)
            .then(([lastFiftyBloodSugar, TwentyFourHourBloodSugar, TwentyFourHourAvg]) => {
                let infoObj = {
                    lastFiftyBloodSugar,
                    TwentyFourHourAvg,
                    TwentyFourHourBloodSugar
                };
                res.render('users/stats', {
                    infoObj
                });
            })
            .catch(next);
    });

    router.get('/profile', (req, res, next) => {
        //We want to get all the information about the user and display
        console.log("res.locals.currentUser should have profile information");
        console.log(res.locals.currentUser);
        //Get profile of the user
        Profile.findOne({
                where: {
                    user_id: req.user.id
                },
                raw: true
            })
            .then(profile => {
                console.log("profile info is", profile);
                const profileList = [];
                let weight = {
                    weight: profile.weight
                };
                profileList.push(weight);
                let height = {
                    height: profile.height
                };
                profileList.push(height);
                let age = {
                    age: profile.age
                };
                profileList.push(age);
                let infoObj = {};
                infoObj.profile = profileList;
                res.render("users/profile", {
                    infoObj
                });
            })
            .catch(next);
    });

    return router;
};
