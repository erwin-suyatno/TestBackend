import Transaction from "../models/TransactionModel.js";
import Member from "../models/MemberModel.js";
import Book from "../models/BookModel.js";


// getAll Transaction
export const getAllTransactions = async(req, res) =>{
    try {
        const response = await Transaction.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// add Transaction
export const addTransaction = async(req, res) =>{
    try {
        // update borrowBook
        const CodeMember = await Member.findOne({attributes: ['book'],where:{
            code: req.body.memberCode
        }});
        var nilaiBook = JSON.parse(JSON.stringify(CodeMember));
        var nilaiBook = nilaiBook.book;
        if (nilaiBook >= 2) {
            res.status(400).json({msg: "Sudah Pinjam 2 Buku"});
        } else {
            // update Book Stock
            const CodeBook = await Book.findOne({attributes: ['stock'], where:{
                code: req.body.bookCode
            }});
            var nilaiStock = JSON.parse(JSON.stringify(CodeBook));
            var nilaiStock = nilaiStock.stock;
            if (nilaiStock == 0) {
                res.status(400).json({msg: "Buku Sudah Pinjam"});
            } else {
                var nilaiStock = nilaiStock - 1;
                var nilaiBook = nilaiBook + 1;
                // update borrowBook
                await Member.update({book: nilaiBook},{
                    where:{
                        code: req.body.memberCode
                    }
                });
                // update Book Stock
                await Book.update({stock: nilaiStock},{
                    where:{
                        code: req.body.bookCode
                    }
                });
                // add Transaction
                await Transaction.create({
                    dateBorrow: req.body.dateBorrow,
                    dateBack: req.body.dateBack,
                    bookCode: req.body.bookCode,
                    memberCode: req.body.memberCode
                });
            }
        }
        res.status(201).json({msg: "transaksi berhasil ditambahkan"});
    } catch (error) {
        console.log(error.message);
    }
}

// update Transaction
export const updateTransaction = async(req, res) =>{
    try {
        await Transaction.update({dateBack: req.body.dateBack},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Buku Kembali"});

        // ambil code Buku
        const CodeBook = await Transaction.findOne({attributes: ["bookCode"], where:{
            id: req.params.id
        }});
        var BookCode = JSON.parse(JSON.stringify(CodeBook));
        var BookCode = BookCode.bookCode;
        console.log(BookCode);
        // ambil stock buku
        const stockBook = await Book.findOne({attributes: ["stock"],where:{
            code: BookCode
        }});
        var BookStock = JSON.parse(JSON.stringify(stockBook));
        var BookStock = BookStock.stock;
        console.log(BookStock);
        var BookStock = BookStock + 1;
        // update stock buku
        await Book.update({stock: BookStock},{
            where:{
                code: BookCode
            }
        });

        // ambil code Member
        const CodeMember = await Transaction.findOne({attributes: ["memberCode"], where:{
            id: req.params.id
        }});
        var MemberCode = JSON.parse(JSON.stringify(CodeMember));
        var MemberCode = MemberCode.memberCode;
        console.log(MemberCode);
        // ambil banyak buku
        const bookMember = await Member.findOne({attributes: ["book"],where:{
            code: MemberCode
        }});
        var BookMember = JSON.parse(JSON.stringify(bookMember));
        var BookMember = BookMember.book;
        console.log(BookMember);
        var BookMember = BookMember - 1;
        // update banyak buku
        await Member.update({book: BookMember},{
            where:{
                code: MemberCode
            }
        });

        // ambil tanggal pinjam
        const bookBorrow = await Transaction.findOne({attributes: ["dateBorrow"], where:{
            id: req.params.id
        }});
        var BookBorrow = JSON.parse(JSON.stringify(bookBorrow));
        var BookBorrow = BookBorrow.dateBorrow;
        var BookBorrow = new Date(BookBorrow);
        // ambil tanggal kembali
        const bookBack = await Transaction.findOne({attributes: ["dateBack"], where:{
            id: req.params.id
        }});
        var BookBack = JSON.parse(JSON.stringify(bookBack));
        var BookBack = BookBack.dateBack;
        var BookBack = new Date(BookBack);
        // kalkulasi selisih hari
        var Difference_In_Time = BookBack.getTime() - BookBorrow.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        console.log(Difference_In_Days);
        // penentuan peminjaman lebih dari 7 hari
        if (Difference_In_Days > 7) {
            await Member.update({penalized: "Yes"},{
                where:{
                    code: MemberCode
                }});
        } else {
            await Member.update({penalized: "Not"},{
                where:{
                    code: MemberCode
                }});
        }
    } catch (error) {
        console.log(error.message);
    }
}