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
    return models.Vaccine.create({
      description: "Diphtheria, tetanus toxoids, and whole cell pertussis vaccine (DTP), for intramuscular use",
      CPTCode: 90701,
      CVXCode: 1,
      name: "DTP"
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Vaccines', null, {}, models.Vaccine);

  }
};
