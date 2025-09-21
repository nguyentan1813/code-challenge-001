// TODO: Implement a more sophisticated logging mechanism if needed
export class LogHelper {
  static info(message: string) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`)
  }

  static error(message: string, error: Error) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...error.message, error.stack)
  }

  static debug(message: string, data: object = {}) {
    console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, data)
  }
}
