import Book from "../models/BookModel.js";
import {Op} from "sequelize";

// getAll Books
export const getAllBooks = async(req, res) =>{
    try {
        const response = await Book.findAll({
            where:{
                stock:{
                    [Op.gt]: 0
                }
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// add book
export const addBook = async(req, res) =>{
    try {
        await Book.create({
            code: req.body.code,
            title: req.body.title,
            author: req.body.author,
            stock: req.body.stock
        });
        res.status(201).json({msg: "Book berhasil ditambahkan"});
    } catch (error) {
        console.log(error.message);
    }
}