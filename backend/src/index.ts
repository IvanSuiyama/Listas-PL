import express, {Request, Response } from "express";
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json())

const corOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    optionsSucessStatus: 200,
}

app.use(cors(corOptions))

app.post("/home")
