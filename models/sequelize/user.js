'use strict';
const bcrypt = require("bcrypt");
const shortId = require("shortid");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    token: DataTypes.STRING,
    profileId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.BloodSugarRecord, {
          foreignKey: "userId"
        });
        User.hasOne(models.Profile, {
          foreignKey: "userId"
        });

      },
      findByToken: function(token) {
        return User.findOne({
            token
          })
          .then((user) => {
            return user;
          })
          .catch((err) => {
            return err;
          });
      }
    },
    instanceMethods: {
      validatePassword: function(password) {
        let hashedPassword = this.getDataValue("hashedPassword");
        return bcrypt.compareSync(password, hashedPassword);
      }
    }
  });
  User.beforeCreate(async function(user, options, done) {
    //hashedPassword will temporarily be the actual password
    let password = user.getDataValue("hashedPassword");
    let hashedPassword = await bcrypt.hash(password, 8);
    user.setDataValue("hashedPassword", hashedPassword);
    done(null, options);
  });
  User.beforeCreate(async function(user, options, done) {
    //create token for user
    let email = user.getDataValue("email");
    let token = await bcrypt.hash(email + shortId.generate(), 8);
    user.setDataValue("token", token);
    done(null, options);
  });

  return User;
};
