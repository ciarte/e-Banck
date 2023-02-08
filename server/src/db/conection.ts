import { Sequelize } from "sequelize";
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize("eBank", "postgres", "123456789", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;