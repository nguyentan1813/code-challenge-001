import dotenv from "dotenv"
import { DataSource } from "typeorm"
import { ResourceModel } from "../models/resource.model"
dotenv.config({ path: "src/problem5/.env" })

export class Config {
  static getDatabaseConfig() {
    return {
      host: process.env.DB_HOST || "localhost",

      port: parseInt(process.env.DB_PORT || "5432", 10),

      user: process.env.DB_USER || "user",

      password: process.env.DB_PASSWORD || "password",

      database: process.env.DB_NAME || "resources_db",
    }
  }

  static getServerPort() {
    return parseInt(process.env.APP_API_PORT || "3000", 10)
  }

  static getSwaggerUrl() {
    return process.env.SWAGGER_URL || "http://localhost:3000/api"
  }

  static PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    database: process.env.DB_NAME || "testdb",
    synchronize: true,
    logging: false,
    entities: [ResourceModel],
    migrations: [],
    subscribers: [],
  })
}
