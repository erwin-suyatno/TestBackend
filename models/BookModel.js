import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Transaction from "./TransactionModel.js";

const { DataTypes } = Sequelize;

const Book = db.define('books',{
    code:{
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true
    },
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    stock: DataTypes.INTEGER,
},{
    freezeTableName: true
});

Book.hasMany(Transaction)
Transaction.belongsTo(Book)

export default Book;

(async()=>{
    await db.sync();
})();