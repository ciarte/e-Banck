import sequelize from "../db/conection";
import { DataTypes } from "sequelize";

export const Product = sequelize.define("product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      len: [15, 15],
      msg: "Cards must contain 15 digits",
    },
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate:{
    max:999,
    min:100
  }
  },
  description: {
    type: DataTypes.ENUM,
    values: ["PESOS", "USD"],
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
