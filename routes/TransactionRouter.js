import express from "express";
import { getAllTransactions, addTransaction, updateTransaction } from "../controller/TransactionController.js";
const routerTransaction = express.Router();

routerTransaction.get('/transactions', getAllTransactions);
routerTransaction.post('/transactions/add', addTransaction);
routerTransaction.put('/transactions/update/:id', updateTransaction);

export default routerTransaction;