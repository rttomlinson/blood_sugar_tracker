const express = require("express");
const router = express.Router();


module.exports = (User, sequelize, BloodSugarRecord, Profile, Dose, helpers, Vaccine) => {
    const BSR = BloodSugarRecord;
    const h = helpers.registered;

    router.get("/", function(req, res, next) {
        res.render("users/show");
    });

    router.get('/stats', (req, res, next) => {
        //We want to get all the medical info
        //Only have bloodsugars for now
        let bloodSugarInfo = [];
        bloodSugarInfo.push(BSR.getLastFiftyBloodSugarForUser(req.user.id));
        bloodSugarInfo.push(BSR.getBloodSugarInLast24Hours(req.user.id));
        bloodSugarInfo.push(BSR.getAverageBloodSugarInLast24Hours(req.user.id));
        Promise.all(bloodSugarInfo)
            .then(([lastFiftyBloodSugar, TwentyFourHourBloodSugar, TwentyFourHourAvg]) => {
                let data = {
                    lastFiftyBloodSugar,
                    TwentyFourHourAvg,
                    TwentyFourHourBloodSugar
                };
                res.status(200).json({
                    data
                });
            })
            .catch(next);
    });

    router.get('/profile', (req, res, next) => {
        //We want to get all the information about the user and display
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


    router.post('/profile/edit', (req, res, next) => {
        //We want to get all the information about the user and display
        let weight = req.body.profile.weight;
        let height = req.body.profile.height;
        let age = req.body.profile.age;
        //Get profile of the user
        Profile.update({
                weight,
                height,
                age
            }, {
                where: {
                    user_id: req.user.id
                }
            })
            .then(profile => {
                res.redirect("back");
            })
            .catch(next);
    });
    
    router.get('/vaccines', (req, res, next) => {
        let userId = req.user.id;
        Vaccine.findAll({})
        .then(doses =>{
            res.status(200).json({userVaccines: doses});
        });
    });
    
    
    return router;
};
