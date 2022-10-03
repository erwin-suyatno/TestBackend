import express from "express";
import { getAllBooks, addBook } from "../controller/BookController.js";

const routerBook = express.Router();

routerBook.get('/books', getAllBooks);
routerBook.post('/books/add', addBook);

export default routerBook;