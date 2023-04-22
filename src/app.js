import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import joi from "joi"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { v4 as uuid } from 'uuid';
import dayjs from "dayjs";

const app = express();

app.use(express.json());
app.use(cors())
dotenv.config()

let db
const mongoClient = new MongoClient(process.env.DATABASE_URL)
mongoClient.connect()
    .then(() => db = mongoClient.db())
    .catch((err) => console.log(err.message))


app.post("/sign-up", async (req, res) => {
    const { password, email, name } = req.body;

    const userSchema = joi.object({
        name: joi.string().required(),
        password: joi.string().required().min(3),
        email: joi.string().required().email()
    })

    const validation = userSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const user = await db.collection("users").findOne({ email })
        if (user) return res.status(409).send("Usuario com email ja cadastrado")

        const encryptedPassword = bcrypt.hashSync(password, 10);

        await db.collection("users").insertOne({
            name,
            email,
            password: encryptedPassword
        })

        res.sendStatus(201)

    } catch (err) {
        return res.status(500).send(err.message);
    }
})

app.post("/sign-in", async (req, res) => {
    const { email, password } = req.body;

    const loginSchema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required().min(3)
    })

    const validation = loginSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    const user = await db.collection("users").findOne({ email });

    if (!user) return res.sendStatus(404)

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();

        await db.collection("sessions").insertOne({ userId: user._id, token })
        res.send({ token, name: user.name })
    }
    else {
        res.sendStatus(401)
    }
})

app.post("/nova-transacao/:type", async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    console.log(req.params.type)
    console.log(authorization)
    console.log(token)

    if (!token) return res.sendStatus(401)

    const operationSchema = joi.object({
        value: joi.number().positive().precision(2).required(),
        description: joi.string().required()
    })

    const validation = operationSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(401).send("Sessão não encontrada");

        const user = await db.collection("users").findOne({ _id: session.userId })

        if (!user) return res.status(401).send("Usuario não encontrado")

        if (user) {
            const transaction = await db.collection("transactions").insertOne({
                userId: user._id,
                value: req.body.value,
                type: req.params.type,
                date: dayjs(Date.now()).format('DD/MM')
            })
        }

        res.sendStatus(201)

    } catch (err) {
        return res.status(500).send(err.message);
    }
})

app.get("/transacoes", async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(401).send("Sessão não encontrada");

        const user = await db.collection("users").findOne({ _id: session.userId })
        if (!user) return res.status(401).send("Usuario não encontrado")

        const transacoes = await db.collection("transactions").find({ userId: session.userId }).toArray()
        console.log(transacoes)
        res.status(200).send(transacoes)

    } catch (err) {
        return res.status(500).send(err.message);
    }


})
const PORT = 5000;
app.listen(PORT, () => console.log(`App listening in port ${PORT}`));