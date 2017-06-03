'use strict';
const models = require('../../models/sequelize');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let userDoses = [];
        for (let i = 1; i <= 5; i++) {
            let userDose = {
                userId: 1,
                doseId: i,
            };
            userDoses.push(userDose);
        }
    
    return queryInterface.bulkInsert("UserDoses", userDoses, {});

    
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('UserDoses', null, {}, models.UserDose);
  }
};
