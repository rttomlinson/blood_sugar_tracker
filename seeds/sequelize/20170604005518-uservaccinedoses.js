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
    let userVaccineDoses = [];
    let userVaccineDose1 = {
      userId: 1,
      vaccineDoseId: 1
    };
    userVaccineDoses.push(userVaccineDose1);
    let userVaccineDose2 = {
      userId: 1,
      vaccineDoseId: 2
    };
    userVaccineDoses.push(userVaccineDose2);
    let userVaccineDose3 = {
      userId: 1,
      vaccineDoseId: 3
    };
    userVaccineDoses.push(userVaccineDose3);
    let userVaccineDose4 = {
      userId: 1,
      vaccineDoseId: 4
    };
    userVaccineDoses.push(userVaccineDose4);
    let userVaccineDose5 = {
      userId: 1,
      vaccineDoseId: 5
    };
    userVaccineDoses.push(userVaccineDose5);

    return queryInterface.bulkInsert("UserVaccineDoses", userVaccineDoses, {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('UserVaccineDoses', null, {}, models.UserVaccineDose);

  }
};
