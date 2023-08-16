import "reflect-metadata"
import {config} from 'dotenv'
import { DataSource } from "typeorm"

config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_NAME),
    password: String(process.env.DB_PASS),
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: ['./src/entity/**/*.ts'],
    migrations: ['./src/migration/*.ts'],
    subscribers: [],
})
