import { Router } from 'express';
import { getTransactions, newTransaction } from '../controllers/transactionsController.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';
import { operationSchema } from '../schemas/transactions.schemas.js';

const transactionsRouter = Router();

transactionsRouter.post("/nova-transacao/:type", validateSchema(operationSchema), newTransaction)
transactionsRouter.get("/transacoes", getTransactions)

export default transactionsRouter