import cors from "cors"
import express from "express"
import database from "./database/index.js"
import User from "./database/models/user.js"
import authToken from "./middlewares/authToken.js"

import authRouter from "./routes/auth.js"
import Helper from "./services/helper.js"

const app = express()

app.use(cors())
app.set("trust proxy", true)
app.use(express.json())


app.use("/auth", Helper.valideBody,authRouter)

app.use("/test", Helper.valideBody, authToken.isAdmin, async (req, resp) => {
        const users = await User.findAll()

        return resp.json(users)
})

app.use((error, request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    return response.json({
        status: "Error",
        error: {
            message: error.message
        },  
    })
})

app.listen(6278, () => {
    console.log("App is running http://localhost:6278/ 🚀 ")
})