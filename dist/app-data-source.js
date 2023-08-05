
import { DataSource } from "typeorm";
import { defaults } from "./config.js";

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 3306,
    username: "root",
    password: defaults.password,
    database: "wallet_c5h8",
    entities: ["./dist/entity/*.js"],
    logging: true,
    synchronize: true,
});
