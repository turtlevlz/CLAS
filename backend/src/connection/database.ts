import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    models: [__dirname + "/../models"]
});

sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.error("DB connection error:", err));