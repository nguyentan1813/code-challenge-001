import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { Request, Response, NextFunction } from "express"
import { LogHelper } from "../helpers/log.helper"

type Source = "body" | "query" | "params"

interface ValidatedRequest<T> extends Request {
  validated?: T
}

export function validationMiddleware<T extends object>(
  dtoClass: new () => T,
  source: Source = "body",
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    LogHelper.info(`Validating request: ${req.url} - source: ${source}`)
    const dtoObj = plainToInstance(dtoClass, req[source], { enableImplicitConversion: true })
    const errors = await validate(dtoObj, {
      whitelist: true,
      forbidNonWhitelisted: true,
    })
    LogHelper.debug("Validation params", { dtoObj })
    if (errors.length > 0) {
      const validationErr = {
        message: "Validation failed",
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      }
      LogHelper.debug("Validation Errors", validationErr)
      LogHelper.info(`Validating request: ${req.url} - source: ${source} - falied`)
      return res.status(400).json(validationErr)
    }
    ;(req as ValidatedRequest<T>).validated = dtoObj
    next()
  }
}
