import express from "express"
import { router } from "./routes/api.route"
import cors from "cors"
import bodyParser from "body-parser"
import { setupSwagger } from "./config/swagger"
import { Config } from "./config/config"

const app = express()
app.use(cors())
app.use(bodyParser.json())

Config.PostgresDataSource.initialize().then(() => {
  console.log("Database connected!")

  // mount API
  app.use("/api", router)

  app.listen(4000, () => {
    console.log(`Server running on port ${Config.getServerPort()}`)
  })
})

// Swagger
setupSwagger(app)

export default app
