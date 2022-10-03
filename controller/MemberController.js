import Member from "../models/MemberModel.js";

// getAll members
export const getAllMembers = async(req, res) =>{
    try {
        const response = await Member.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// add member
export const addMember = async(req, res) =>{
    try {
        await Member.create({
            code: req.body.code,
            name: req.body.name,
            book: 0,
            penalized: "Not"
        });
        res.status(201).json({msg: "Member berhasil ditambahkan"});
    } catch (error) {
        console.log(error.message);
    }
}