
import { DataSource } from "typeorm";
import { defaults } from "./config.js";
import { User } from "./entity/user.entity.js";

export const appDataSource = new DataSource({
    type: "postgres",
    host: "dpg-cj6vltsl975s73cmnmeg-a.frankfurt-postgres.render.com",
    port: 5432,
    username: "root",
    ssl:true,
    password: '4eCyXTpCEEaZsdjN59hi3Koinx0ewI11',
    database: "wallet_c5h8",
    entities: [User],
    logging: true,
    synchronize: true,
});
