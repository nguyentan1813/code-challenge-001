import path from "path"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { Express } from "express"
import { Config } from "./config"
import { validationMetadatasToSchemas } from "class-validator-jsonschema"
import { getMetadataStorage } from "class-validator"

const schemas = validationMetadatasToSchemas({
  classValidatorMetadataStorage: getMetadataStorage(),
})

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Resource API",
      version: "1.0.0",
      description: "API documentation for Resource CRUD service",
    },
    components: { schemas },
    servers: [{ url: Config.getSwaggerUrl() }],
  },

  apis: [path.resolve(__dirname, "../routes/*.*"), path.resolve(__dirname, "../dtos/*.*")],
}

const swaggerSpec = swaggerJsdoc(options)

export function setupSwagger(app: Express) {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
