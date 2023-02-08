"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new sequelize_1.Sequelize("eBank", "postgres", "123456789", {
    host: "localhost",
    dialect: "postgres",
});
exports.default = sequelize;
