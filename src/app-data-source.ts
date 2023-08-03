import { DataSource } from "typeorm"

export const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mysql",
    database: "wallet",
    entities: ["./entity/*.js"],
    logging: true,
    synchronize: true,
})