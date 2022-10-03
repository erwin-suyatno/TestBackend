import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Transaction from "./TransactionModel.js";

const { DataTypes } = Sequelize;

const Member = db.define('members',{
    code:{ 
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    book: DataTypes.INTEGER,
    penalized: DataTypes.STRING
},{
    freezeTableName: true
});

Member.hasMany(Transaction)
Transaction.belongsTo(Member)

export default Member;

(async()=>{
    await db.sync();
})();