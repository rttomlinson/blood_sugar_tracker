'use strict';
const models = require('../../models/sequelize');
const BloodSugarRecord = models.BloodSugarRecord;
module.exports = {
    up: function(queryInterface, Sequelize) {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('Person', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        
        let bloodSugars = [];
        for (let i = 0; i < 100; i++) {
            let randomTime = Math.floor(Date.now() - (Math.random() * 10000000000));
            let bloodSugar = {
                user_id: 1,
                blood_sugar: Math.floor(Math.random() * 500),
                time: new Date(randomTime)
            };
            bloodSugars.push(bloodSugar);
        }
        // handful of recent times
        for (let i = 0; i < 20; i++) {
            let bloodSugar = {
                user_id: 1,
                blood_sugar: Math.floor(Math.random() * 500),
                time: new Date()
            };
            bloodSugars.push(bloodSugar);
        }
        return queryInterface.bulkInsert("BloodSugarRecords", bloodSugars, {});



    },

    down: function(queryInterface, Sequelize) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
        return queryInterface.bulkDelete('BloodSugarRecords', null, {}, models.BloodSugarRecord);

    }
};
