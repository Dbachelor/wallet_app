import { defaults } from "pg";
import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: defaults.password,
    database: "wallet_c5h8",
    entities: ["./dist/entity/*.js"],
    logging: true,
    synchronize: true,
});
