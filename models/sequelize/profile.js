'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    weight: DataTypes.REAL,
    height: DataTypes.REAL,
    age: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Profile.hasOne(models.User, {
          foreignKey: "profile_id"
        });
      }
    }
  });
  return Profile;
};