"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      film.hasMany(models.filmActor, {
        foreignKey: "film_id",
      });
      models.filmActor.belongsTo(film, {
        foreignKey: "film_id",
      });
    }
  }
  film.init(
    {
      film_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "film_id",
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      release_year: DataTypes.DATE,
      last_update: {
        type: DataTypes.DATE,
        onUpdate: "RESTRICT",
      },
    },
    {
      sequelize,
      modelName: "film",
      tableName: "film",
    }
  );
  film.removeAttribute("createdAt");
  film.removeAttribute("updatedAt");
  return film;
};
