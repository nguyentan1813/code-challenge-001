import app from "./app"
import { Config } from "./config/config"

const PORT = Config.getServerPort()
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
