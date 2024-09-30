const { DataTypes } = require("sequelize");
const database = require("../config/database");

const Pokemon = database.db.define("Pokemon", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  habilidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  peso: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Pokemon;
