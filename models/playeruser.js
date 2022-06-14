"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = (sequelize, DataTypes) => {
  class PlayerUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PlayerUser.hasOne(models.PlayerUserBio, {
        foreignKey: "playerUserId",
        as: "PlayerUserBio",
      });
    }

    static async authenticate({ username, password }) {
      try {
        const user = await this.findOne({ where: { username } });
        if (!user) return Promise.reject("User not found!");
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return Promise.reject("Wrong password");
        return Promise.resolve(user);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    generateToken() {
      const payload = {
        id: this.id,
        username: this.username,
      };
      const rahasia = "inirahasia";
      const token = jwt.sign(payload, rahasia);
      return token;
    }
  }
  PlayerUser.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PlayerUser",
    }
  );
  return PlayerUser;
};
