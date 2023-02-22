"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const conection_1 = __importDefault(require("../db/conection"));
const sequelize_1 = require("sequelize");
exports.Product = conection_1.default.define("product", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [16, 16],
        },
    },
    code: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 9999,
            min: 1000
        }
    },
    description: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["PESOS", "USD"],
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});
