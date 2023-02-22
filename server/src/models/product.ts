import sequelize from "../db/conection";
import { DataTypes } from "sequelize";

export const Product = sequelize.define("product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [16,16],
    },
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate:{
    max:9999,
    min:1000
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
