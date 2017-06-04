'use strict';
module.exports = function(sequelize, DataTypes) {
  var VaccineDose = sequelize.define('VaccineDose', {
    vaccineId: DataTypes.INTEGER,
    doseId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        VaccineDose.belongsTo(models.Vaccine, {
          foreignKey: "vaccineId"
        });
        VaccineDose.belongsTo(models.Dose, {
          foreignKey: "doseId"
        });
        
        //UserVaccineDose relationship
        VaccineDose.hasMany(models.UserVaccineDose, {
          foreignKey: "vaccineDoseId"
        });
        VaccineDose.belongsToMany(models.User, {
          through: models.UserVaccineDose,
          foreignKey: "vaccineDoseId",
          otherKey: "userId"
        });
      }
    }
  });
  return VaccineDose;
};