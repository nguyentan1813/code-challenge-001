import type { Response } from "express"
import { LogHelper } from "../helpers/log.helper"

export class BaseController {
  returnSuccess<T>(res: Response, data: T, message = "Success") {
    const response = {
      message,
      data,
    }
    LogHelper.debug("Response Data", response)
    LogHelper.info(message)
    return res.status(200).json(response)
  }

  returnError(res: Response, error: unknown, message = "Error", statusCode = 500) {
    if (!(error instanceof Error)) {
      LogHelper.error("Unknown error type", new Error(String(error)))
      return res.status(statusCode).json({
        message,
        error: "sys_error",
      })
    }
    LogHelper.error(message, error)
    return res.status(statusCode).json({
      message,
      error: "process_failed",
    })
  }
}
