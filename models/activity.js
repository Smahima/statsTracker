'use strict';
module.exports = function(sequelize, DataTypes) {
  var activity = sequelize.define('activity', {
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return activity;
};