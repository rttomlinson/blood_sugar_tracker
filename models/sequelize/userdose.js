'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserDose = sequelize.define('UserDose', {
    completed: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    doseId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        UserDose.belongsTo(models.User, {
          foreignKey: "userId"
        });
        UserDose.belongsTo(models.Dose, {
          foreignKey: "doseId"
        });
        
        
        
      }
    }
  });
  return UserDose;
};