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
        
        Vaccine.belongsToMany(models.Dose, {
          through: models.VaccineDose,
          foreignKey: "vaccineId",
          otherKey: "doseId"
        });
        
        Vaccine.hasMany(models.VaccineDose, {
          foreignKey: "vaccineId"
        });
      }
    }
  });
  return Vaccine;
};