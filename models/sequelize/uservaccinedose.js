'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserVaccineDose = sequelize.define('UserVaccineDose', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    vaccineDoseId: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        UserVaccineDose.belongsTo(models.User, {
          foreignKey: "userId"
        });
        UserVaccineDose.belongsTo(models.VaccineDose, {
          foreignKey: "vaccineDoseId",
          targetKey: "id"
        });
      }
    }
  });
  return UserVaccineDose;
};