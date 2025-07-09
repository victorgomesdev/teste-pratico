import express from "express";
import AppDataSource from "./datasource/app-data-source";
import { UserController } from "./controllers/user.controller";
import { routes } from "./routes";
import { routesValidator } from "./common/validators";

const app = express()

app.use(express.json())
app.use(routesValidator)

const connectDatabase = async () => {
    try {
        await AppDataSource.initialize()
    } catch (err) {
        console.log("Database error: " + err)
    }
}

connectDatabase()

app.use(routes.usuarios.path, UserController)

app.listen(3000, () => {
    console.log("SERVER RUNNING")
})