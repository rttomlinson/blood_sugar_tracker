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
        Dose.hasMany(models.Vaccine, {
            foreignKey: "vaccineId"
        });
        
        Dose.hasMany(models.UserDose, {
          foreignKey: "doseId"
        });
        Dose.belongsToMany(models.User, {
          through: models.UserDose,
          foreignKey: "doseId",
          otherKey: "userId"
        });
        
        
      }
    }
  });
  return Dose;
};