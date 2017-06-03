'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    weight: DataTypes.REAL,
    height: DataTypes.REAL,
    age: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Profile.hasOne(models.User, {
          foreignKey: "profileId"
        });
      }
    }
  });
  return Profile;
};