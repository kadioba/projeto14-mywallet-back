import joi from "joi"
import { db } from "../database/database.js";
import dayjs from "dayjs";

export async function newTransaction(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.status(401).send("Token de usuario necessario para realizar a operação")

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
                date: dayjs(Date.now()).format('DD/MM'),
                description: req.body.description
            })
        }

        res.sendStatus(201)

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getTransactions(req, res) {
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
}