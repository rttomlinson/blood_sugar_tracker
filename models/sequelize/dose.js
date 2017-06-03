'use strict';
module.exports = function(sequelize, DataTypes) {
  var Dose = sequelize.define('Dose', {
    doseOrder: DataTypes.INTEGER,
    recommendedAdministration: DataTypes.INTEGER,
    vaccineId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Dose.belongsTo(models.Vaccine, {
            foreignKey: "vaccineId"
        });
      }
    }
  });
  return Dose;
};