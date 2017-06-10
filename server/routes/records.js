const express = require("express");
const router = express.Router();


module.exports = (BloodSugarRecord) => {

    router.post("/bloodsugar", (req, res, next) => {
        let userId = req.body["user-id"];
        let bloodSugar = req.body["blood-sugar"];
        let time = Date.parse(req.body["time-of-reading"]);
        console.log("Time from form is ", Date(time));
        //create new Record in the db
        BloodSugarRecord.create({
                user_id: userId,
                blood_sugar: bloodSugar
            })
            .then(() => {
                res.redirect("/");
            });
    });
    return router;
};
