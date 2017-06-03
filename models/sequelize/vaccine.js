'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vaccine = sequelize.define('Vaccine', {
    name: DataTypes.STRING,
    CTPCode: DataTypes.INTEGER,
    CVXCode: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Vaccine.hasMany(models.Dose, {
          foreignKey: "vaccineId"
        });
      }
    }
  });
  return Vaccine;
};