"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      this.hasMany(models.Airport, {
        foreignKey: "cityId",
        as: "airportsList",
      });
    }
  }

  City.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        allowNull: false,
        defaultValue: "Active",
      },
    },
    {
      sequelize,
      modelName: "City",
    },
  );

  return City;
};
