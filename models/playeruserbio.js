"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlayerUserBio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PlayerUserBio.belongsTo(models.PlayerUser, {
        foreignKey: "playerUserId",
        as: "PlayerUser",
      });
    }
  }
  PlayerUserBio.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      playerUserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PlayerUserBio",
    }
  );
  return PlayerUserBio;
};
