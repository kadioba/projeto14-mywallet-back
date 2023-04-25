import joi from "joi";
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid';
import { db } from "../database/database.js";

export async function signUp(req, res) {
    const { password, email, name } = req.body;

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
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {

        const user = await db.collection("users").findOne({ email });

        if (!user) return res.status(404).send("Email não cadastrado")

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            await db.collection("sessions").insertOne({ userId: user._id, token })
            res.status(200).send({ token, name: user.name })
        }

        else {
            res.status(401).send("Senha incorreta")
        }
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function logOut(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    try {
        await db.collection("sessions").deleteOne({ token });
        res.sendStatus(200)

    } catch (err) {

        return res.status(500).send(err.message);
    }
}