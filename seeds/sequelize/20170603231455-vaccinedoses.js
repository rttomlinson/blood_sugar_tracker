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
    let vaccineDoses = [];
    let vaccineDose1 = {
      vaccineId: 1,
      doseId: 1
    };
    vaccineDoses.push(vaccineDose1);
    let vaccineDose2 = {
      vaccineId: 1,
      doseId: 2
    };
    vaccineDoses.push(vaccineDose2);
    let vaccineDose3 = {
      vaccineId: 1,
      doseId: 3
    };
    vaccineDoses.push(vaccineDose3);
    let vaccineDose4 = {
      vaccineId: 1,
      doseId: 4
    };
    vaccineDoses.push(vaccineDose4);
    let vaccineDose5 = {
      vaccineId: 1,
      doseId: 5
    };
    vaccineDoses.push(vaccineDose5);

    return queryInterface.bulkInsert("VaccineDoses", vaccineDoses, {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('VaccineDoses', null, {}, models.VaccineDose);

  }
};
