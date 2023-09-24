"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      actor.hasMany(models.filmActor, {
        foreignKey: "actor_id",
      });
      models.filmActor.belongsTo(actor, {
        foreignKey: "actor_id",
      });
    }
  }
  actor.init(
    {
      actor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "actor_id",
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      last_update: {
        type: DataTypes.DATE,
        onUpdate: "RESTRICT",
      },
    },
    {
      sequelize,
      modelName: "actor",
      tableName: "actor",
    }
  );
  actor.removeAttribute("createdAt");
  actor.removeAttribute("updatedAt");
  return actor;
};
