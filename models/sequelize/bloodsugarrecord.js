'use strict';
module.exports = function(sequelize, DataTypes) {
  var BloodSugarRecord = sequelize.define('BloodSugarRecord', {
    user_id: DataTypes.INTEGER,
    blood_sugar: DataTypes.INTEGER,
    time: {
        type: DataTypes.DATE
  }}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        BloodSugarRecord.belongsTo(models.User, {
            foreignKey: "user_id"
        });
      },
      getAllBloodSugarForUser: function(id) {
          return BloodSugarRecord.findAll({
              where: { user_id: id },
              raw: true
          });
      },
      getLastFiftyBloodSugarForUser: function(id) {
          return BloodSugarRecord.findAll({
              where: { user_id: id },
              limit: 50,
              raw: true
          });
      },
      getBloodSugarInLast24Hours: function(id) {
          return BloodSugarRecord.findAll({
              where: { user_id: id,
                        time: { $gt: Date.now() - 86400000 }},
              raw: true
          });
      },
      getAverageBloodSugarInLast24Hours: function(id) {
          return BloodSugarRecord.aggregate("blood_sugar", "AVG", {
              where: { user_id: id,
                        time: { $gt: Date.now() - 86400000 }},
              raw: true
          });
      }
      
    }
  });
  return BloodSugarRecord;
};