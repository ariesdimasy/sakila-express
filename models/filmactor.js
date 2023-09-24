"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class filmActor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      filmActor.belongsTo(models.film, {
        foreignKey: "film_id",
      });
      filmActor.belongsTo(models.actor, {
        foreignKey: "actor_id",
      });
      models.film.hasMany(filmActor, {
        foreignKey: "film_id",
      });
      models.actor.hasMany(filmActor, {
        foreignKey: "actor_id",
      });
    }
  }
  filmActor.init(
    {
      actor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "actor_id",
        // references: {
        //   model: sequelize.model.actor,
        //   key: "actor_id",
        // },
      },
      film_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "film_id",
        // references: {
        //   model: sequelize.model.film,
        //   key: "film_id",
        // },
      },
      last_update: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "filmActor",
      tableName: "film_actor",
    }
  );

  filmActor.removeAttribute("createdAt");
  filmActor.removeAttribute("updatedAt");
  // filmActor.removeAttribute("actorFilmId");
  // filmActor.removeAttribute("filmFilmId");

  return filmActor;
};
