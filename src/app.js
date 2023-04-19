import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import joi from "joi"
import bcrypt from "bcrypt"

const app = express();

app.use(express.json());
app.use(cors())

let db
const mongoClient = new MongoClient("mongodb://localhost:27017/mywallet")
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

const PORT = 5000;
app.listen(PORT, () => console.log(`App listening in port ${PORT}`));