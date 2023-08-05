
import { DataSource } from "typeorm";
import { defaults } from "./config.js";

export const appDataSource = new DataSource({
    type: "postgres",
    host: "postgres://root:4eCyXTpCEEaZsdjN59hi3Koinx0ewI11@dpg-cj6vltsl975s73cmnmeg-a/wallet_c5h8",
    port: 3306,
    username: "root",
    password: defaults.password,
    database: "wallet_c5h8",
    entities: ["./dist/entity/*.js"],
    logging: true,
    synchronize: true,
});
