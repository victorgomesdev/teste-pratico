import express from "express";
import AppDataSource from "./datasource/app-data-source";
import { UserController } from "./controllers/user.controller";

const app = express()

app.use(express.json())

try {
    AppDataSource.initialize()
} catch (err) {
    console.log("Database error: " + err)
}

app.use('/usuarios', UserController)

app.listen(3000, () => {
    console.log("Isso é um teste")
})