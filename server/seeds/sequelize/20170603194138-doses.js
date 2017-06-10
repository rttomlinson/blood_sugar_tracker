'use strict';
const models = require('../../models/sequelize');

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
    let doses = [];
    let dose1 = {
      doseOrder: 1,
      recommendedAdministration: 8,
    };
    doses.push(dose1);
    let dose2 = {
      doseOrder: 2,
      recommendedAdministration: 16,
    };
    doses.push(dose2);
    let dose3 = {
      doseOrder: 3,
      recommendedAdministration: 24,
    };
    doses.push(dose3);
    let dose4 = {
      doseOrder: 4,
      recommendedAdministration: 60,
    };
    doses.push(dose4);
    let dose5 = {
      doseOrder: 5,
      recommendedAdministration: 204,
    };
    doses.push(dose5);

    return queryInterface.bulkInsert("Doses", doses, {});
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Doses', null, {}, models.Dose);

  }
};
