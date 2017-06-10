'use strict';
module.exports = function(sequelize, DataTypes) {
  var BloodSugarRecord = sequelize.define('BloodSugarRecord', {
    userId: DataTypes.INTEGER,
    bloodSugar: DataTypes.INTEGER,
    time: {
        type: DataTypes.DATE
  }}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        BloodSugarRecord.belongsTo(models.User, {
            foreignKey: "userId"
        });
      },
      getAllBloodSugarForUser: function(id) {
          return BloodSugarRecord.findAll({
              where: { userId: id },
              raw: true
          });
      },
      getLastFiftyBloodSugarForUser: function(id) {
          return BloodSugarRecord.findAll({
              where: { userId: id },
              limit: 50,
              raw: true
          });
      },
      getBloodSugarInLast24Hours: function(id) {
          return BloodSugarRecord.findAll({
              where: { userId: id,
                        time: { $gt: Date.now() - 86400000 }},
              raw: true
          });
      },
      getAverageBloodSugarInLast24Hours: function(id) {
          return BloodSugarRecord.aggregate("blood_sugar", "AVG", {
              where: { userId: id,
                        time: { $gt: Date.now() - 86400000 }},
              raw: true
          });
      }
      
    }
  });
  return BloodSugarRecord;
};