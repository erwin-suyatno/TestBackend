import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const { DataTypes } = Sequelize;

const Transaction = db.define('transactions',{
    dateBorrow: DataTypes.DATE,
    dateBack: DataTypes.DATE
},{
    freezeTableName: true
});

export default Transaction;

(async()=>{
    await db.sync();
})();
