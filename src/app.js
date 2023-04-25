import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import authRouter from "./routers/auth.routes.js";
import transactionsRouter from "./routers/transactions.routes.js";

const app = express();

app.use(express.json());
app.use(cors())
app.use(authRouter)
app.use(transactionsRouter)
dotenv.config()


app.listen(process.env.PORT, () => console.log(`App listening in port ${process.env.PORT}`));