import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import routes from "./routes/index.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api",routes)

const PORT = process.env.port || 5000

app.listen(PORT , () =>{
 console.log(`server running on port ${PORT}`)
})
